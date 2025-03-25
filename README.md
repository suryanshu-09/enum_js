# Software Engineering Project
## Enumerations for JavaScript (module)


HI
we need these following modules:
import ConfigManager from './ConfigManager.js';
import Mapper from './Mapper.js';
import Validator from './Validator.js';
import ErrorHandler from './ErrorHandler.js';
import Logger from './Logger.js';



// src/EnumFactory.js

import ConfigManager from './ConfigManager.js';
import Mapper from './Mapper.js';
import Validator from './Validator.js';
import Logger from './Logger.js';
import ErrorHandler from './ErrorHandler.js';
import Exporter from './Exporter.js';

class EnumFactory {
  constructor(config) {
    this.logger = new Logger();
    this.validator = new Validator();
    this.mapper = new Mapper();
    this.errorHandler = new ErrorHandler();
    this.exporter = new Exporter();
    this.configManager = new ConfigManager(config);

    this.logger.log("EnumFactory initialized");
  }

  createEnum(values) {
    try {
      this.validator.validate(values);
      const config = this.configManager.getConfig();
      const mapped = this.mapper.map(values, config);
      const exported = this.exporter.export(mapped);
      this.logger.log("Enum creation successful");
      return exported;
    } catch (err) {
      this.errorHandler.handle(err);
      this.logger.log("Enum creation failed");
      return null;
    }
  }
}

export default EnumFactory;



// src/Exporter.js

class Exporter {
    export(enumObj, format = 'js') {
      switch (format) {
        case 'json':
          return JSON.stringify(enumObj, null, 2); // Pretty-printed JSON
        case 'js':
        default:
          return enumObj; // Just return the object itself
      }
    }
  }
  
  export default Exporter;


  // src/Logger.js

class Logger {
  log(message, ...optionalParams) {
    console.log('[LOG]:', message, ...optionalParams); // Standard log
  }

  warn(message, ...optionalParams) {
    console.warn('[WARN]:', message, ...optionalParams); // Warning log
  }

  error(message, ...optionalParams) {
    console.error('[ERROR]:', message, ...optionalParams); // Error log
  }

  debug(message, ...optionalParams) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[DEBUG]:', message, ...optionalParams); // Only log in dev mode
    }
  }
}

export default Logger;
                       

// src/Validator.js

class Validator {
    constructor() {}
  
    validate(enumConfig) {
      if (!enumConfig || typeof enumConfig !== 'object') {
        console.error('[Validator] Enum config must be a non-null object.');
        return false;
      }
  
      if (!enumConfig.name || typeof enumConfig.name !== 'string') {
        console.error('[Validator] Enum must have a name of type string.');
        return false;
      }
  
      if (!Array.isArray(enumConfig.values) || enumConfig.values.length === 0) {
        console.error('[Validator] Enum values must be a non-empty array.');
        return false;
      }
  
      const valueSet = new Set();
      for (const val of enumConfig.values) {
        if (typeof val !== 'string' && typeof val !== 'number') {
          console.error('[Validator] Enum values must be strings or numbers.');
          return false;
        }
        if (valueSet.has(val)) {
          console.error(`[Validator] Duplicate value found: ${val}`);
          return false;
        }
        valueSet.add(val);
      }
  
      return true;
    }
  }
  
  export default Validator;
  

// src/Mapper.js
class Mapper {
    map(enumConfig) {
      const values = enumConfig.values;
      const enumObj = {};
      for (const val of values) {
        enumObj[val] = val;
      }
      return Object.freeze(enumObj);
    }
  }
  
  export default Mapper;
  



