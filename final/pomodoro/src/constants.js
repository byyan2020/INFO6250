export const TIMER_TIME = {
  WORK: 10,
  REST: 5,
}

export const TIMER_STATUS = {
  PAUSE: 'pause',
  CONTINUE: 'continue',
  WORK: 'work',
  REST: 'rest',
  RESET: 'reset',  
}

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_WORD: 'required-word',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid username consisting of letters and/or numbers',
  [SERVER.REQUIRED_WORD]: 'Please enter a valid word consisting of letters and/or numbers',
  default: 'Something went wrong.  Please try again',
};

export const ACTIONS = {
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',

  TIMER_SET: 'timerSet',
  TIMER_DECREMENT: 'timerDecrement',
  TIMER_WORK_SESSION: 'timerWorkSession',
  TIMER_REST_SESSION: 'timerRestSession',
  TIMER_PAUSE: 'timerPause',
  TIMER_CONTINUE: 'timerContinue',
  TIMER_NOT_START: 'timerNotStart',

  SET_ALARM: 'setAlarm',

  RECORD_INCREMENT: 'recordIncrement',
  
  REPORT_ERROR: 'reportError'
};
