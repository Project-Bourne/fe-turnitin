import FactcheckService from '@/services/factcheck.service';
import { setHistory } from '@/redux/reducer/factcheckSlice';

export async function fetchData(dispatch) {
  const factService = new FactcheckService();
  try {
    const Data = await factService.getFactHistory();

    console.log('Fact Data: ', Data)
    if (Data.status) {
      dispatch(setHistory(Data.data));
    } 
  } catch (error) {
    console.log(error);
  }
}

