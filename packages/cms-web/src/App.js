import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Master, Title,} from 'common-libs';
import moment from 'moment-timezone';
import momentvi from 'moment/locale/vi';
import i18n from './i18n';
import menuConfig from './menu';
import CustomRoutes from './CustomRoutes';
import Resources from './menu/Resources';
import config from './Config';
const NODE_DEFAULT_LANGUAGE = process.env.NODE_DEFAULT_LANGUAGE || 'en';
class App extends Component {
  state = { ready: false };
  constructor(props) {
    super(props);
   
    moment.updateLocale('vi', momentvi);
  }
  componentDidMount() {
    // if ('serviceWorker' in navigator) {
    //   if (process.env.NODE_ENV === 'production') {
    //     runtime.register();
    //   } else {
    //     // eslint-disable-next-line no-console
    //     console.log('Not register service workers');
    //   }
    // }
    this.setState({ ready: true });
  }
  render() {
    if (!this.state.ready) {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      );
    }
    return (
      <Master
        locale={NODE_DEFAULT_LANGUAGE}
        loginPage={LoginPage}
        title={<Title defaultTitle={'CMS module'} title={'generic.appName'} />}
        menuConfig={menuConfig}
        i18nProvider={i18n}
        resources={Resources}
        customReducers={reducers}
        customRoutes={CustomRoutes}
        ga={{ id: config.gaId, debug: false }}
      />
    );
  }
}

export default hot(module)(App);
