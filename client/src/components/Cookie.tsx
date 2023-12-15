import { useCookies } from 'react-cookie';

type CookieData=string | number | object;
interface CookieService {
    setUserCookie: (value: CookieData, options?: object) => void;
    getUserCookie: () => CookieData | null;
    removeUserCookie: () => void;
  }

  const CookieService = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['User', 'MonitoringUser']);
  
    const setUserCookie = (value: CookieData, options = {}):void => {
      setCookie('User', value, options);
    };
  
    const getUserCookie = ():string => {
      return cookies.User || null;
    };
  
    const removeUserCookie = ():void => {
      removeCookie('User');
    };

    const setMonitoringUserCookie = (value: CookieData, options = {}):void => {
        setCookie('MonitoringUser', value, options);
      };
    
    const getMonitoringUserCookie = ():string => {
    return cookies.MonitoringUser || null;
    };

    const removeMonitoringUserCookie = ():void => {
    removeCookie('MonitoringUser');
    };
  
      
  
    return {
        setUserCookie,
        getUserCookie,
        removeUserCookie,
        setMonitoringUserCookie,
        getMonitoringUserCookie,
        removeMonitoringUserCookie
    }

  };
  
export default CookieService;