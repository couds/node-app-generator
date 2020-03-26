import { BrowserRouter, StaticRouter } from 'react-router-dom';

export default process.env.IS_SERVER ? StaticRouter : BrowserRouter;
