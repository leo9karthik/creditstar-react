const { REACT_APP_PUBLIC_URL, REACT_APP_DEVELOPMENTURL } = process.env;

var baseURL;
var projectPath = '';

// console.log(REACT_APP_PRODUCTIONURL, REACT_APP_DEVELOPMENTURL, REACT_APP_TESTURL, REACT_APP_PROJECTPATH, REACT_APP_PUBLIC_URL);

if (process.env.NODE_ENV === 'production') {

    baseURL = `${REACT_APP_DEVELOPMENTURL}`;

} else if (process.env.NODE_ENV === 'development') {

    baseURL = `${REACT_APP_DEVELOPMENTURL}`;

} else {

    baseURL = 'https://application.creditstar.dev';

}
// console.log(baseURL, projectPath);

export var baseURL;
export var projectPath;
