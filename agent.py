import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from uagents.setup import fund_agent_if_low
from uagents import Agent, Context
import pymongo
from datetime import datetime, timedelta


#  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
# openai.api_key = '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'
# mongodb+srv://Shivag:shivashiva@cluster0.mz5u2w1.mongodb.net/tweeter?retryWrites=true&w=majority
def connectMongo(dbName="tweeter") -> pymongo.database.Database:
    try:
        #loading the environment variables from .env file
        
        client = pymongo.MongoClient("mongodb+srv://Shivag:shivashiva@cluster0.mz5u2w1.mongodb.net/tweeter?retryWrites=true&w=majority")
        db = client[dbName]
        return db
    except Exception as e:
        return "Error in Connecting to MongoDB" + str(e)

model_name = "nlptown/bert-base-multilingual-uncased-sentiment"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)


alice = Agent(
    name="alice",
    port=8000,
    seed="alice secret phrase",
    endpoint=["http://127.0.0.1:8000/submit"],
)
 
fund_agent_if_low(alice.wallet.address())

def classify_text(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = torch.argmax(logits, dim=1).item()
    return "violent" if predicted_class == 1 else "non-violent"
 
@alice.on_interval(period=14400)
async def classify_text_interval(ctx: Context):
    db=connectMongo()
    coll=db['tweets']
    # timeToLabel=datetime.utcnow() - timedelta(hours=24*7)
    # data=coll.find({'utcTime':{'$lt':timeToLabel}})
    data=coll.find({})
    for i in data:
        text_to_classify = i['tweet']
    # text_to_classify = "muslims are bad"
        classification = classify_text(text_to_classify)
    # coll.update_one({'_id':i['_id']},{'$set':{'label':classification}})
        ctx.logger.info(f"Classification: {classification}")
 
alice.run()