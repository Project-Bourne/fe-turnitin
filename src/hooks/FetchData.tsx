import HomeService from '@/services/factcheck.service';
import { setHistory } from '@/redux/reducer/factcheckSlice';

export async function fetchData(dispatch) {
  const homeService = new HomeService();
  try {
    const Data = await homeService.getFactHistory();
    if (Data.status) {
      // console.log(Data.data, 'data');
      dispatch(setHistory(Data.data));
    } 
  } catch (error) {
    console.log(error);
  }
}

