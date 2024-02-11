from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import Chrome, ChromeOptions
from selenium.webdriver.support.wait import WebDriverWait
import selenium.webdriver.support.expected_conditions as EC
import pymongo
from datetime import datetime

def connectMongo(dbName="tweeter") -> pymongo.database.Database:

        client = pymongo.MongoClient("mongodb+srv://Shivag:shivashiva@cluster0.mz5u2w1.mongodb.net/tweeter?retryWrites=true&w=majority")
        db = client[dbName]
        return db

db=connectMongo()
coll=db['tweets']
    

def get_tweet_data(article,driver):
    user = article.find_element(By.CSS_SELECTOR, 'div[data-testid="User-Name"]').text.split('\n')
    name = user[0]
    username = user[1]
    postdate = user[-1]
    tweetText = article.find_element(By.XPATH, ".//div[@data-testid='tweetText']").text
    reply_count = article.find_element(By.XPATH, ".//div[@data-testid='reply']").text
    retweet_count = article.find_element(By.XPATH, ".//div[@data-testid='retweet']").text
    like_count = article.find_element(By.XPATH, ".//div[@data-testid='like']").text
    z={"name":name,"username":username,"postdate":postdate,"tweettext":tweetText,"reply-count":reply_count,"retweet-count":retweet_count,"likecount":like_count}
    return z
def find(keyword):
    c=0
    options = ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    driver = Chrome(options=options)

    wait = WebDriverWait(driver, 10)
    driver.get("https://twitter.com/login")

    username = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'input[name="text"]')))
    username.send_keys("satyam_joon")
    username.send_keys(Keys.ENTER)

    password = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'input[name="password"]')))
    password.send_keys('shubhamk319')
    password.send_keys(Keys.ENTER)

    search_box = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'input[data-testid="SearchBox_Search_Input"]')))
    search_box.send_keys(keyword)
    search_box.send_keys(Keys.ENTER)

    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'article[data-testid="tweet"]')))
    data = []
    tweet_ids = set()
    last_position = driver.execute_script("return window.pageYOffset;")
    for i in range(10):
        page_articles = driver.find_elements(By.CSS_SELECTOR, 'article[data-testid="tweet"]')
        for article in page_articles:
            tweet = get_tweet_data(article,driver)
            c+=1
            if(c>10):
                break
            if tweet:
                tweet_id =(tweet["tweettext"])
                if tweet_id not in tweet_ids:
                    tweet_ids.add(tweet_id)
                    data.append(tweet)
        if(c>10):
                break

        scroll_attempt = 0
        for i in range(10):
            driver.execute_script('window.scrollTo(0,document.body.scrollHeight);')
            sleep(1)
            current_position = driver.execute_script("return window.pageYOffset;")
            
            if last_position == current_position:
                scroll_attempt += 1
                
                if scroll_attempt >= 3:
                    scrolling = False
                    break
                else:
                    sleep(1)
            else:
                last_position = current_position
                break
    driver.quit()
    #name
    #username
    #postdate
    #tweettext
    #retweet-count
    #likecount
    for i in data:
         username=i['username']
         tweet=i['tweettext']
         obj={
              "username":username,
              'admin_user':'Shivachauhan17',
              'profile':"",
              'tweet':tweet,
              'label':None,
              'tweet_link':'',
              'is_keyword':False,
              'keyword':"",
              'utcTime':datetime.utcnow()
         }
         coll.insert_one(obj)
    return(data)


print(find("Jagadeesh28M"))