import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (mssg) => toast(mssg);
const toastcontainer = ()=> <ToastContainer/>


export default {
    notify,
    toastcontainer
}