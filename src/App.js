import Index from 'Pages/Routes';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import './App.scss';
import ScreenLoader from 'Components/Screen Loader/ScreenLoader';
import { useEffect, useState } from 'react';
function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (isAppLoading) {
    return <ScreenLoader />;
  }
  else return <Index />
  return (
    <>
    </>
  );
}
export default App;
