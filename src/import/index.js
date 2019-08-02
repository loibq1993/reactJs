import React from 'react';
import * as bs from 'react-bootstrap';
import axios from 'axios/index';
import * as rt from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faStroopwafel, faPlus } from '@fortawesome/free-solid-svg-icons/index'
library.add(faStroopwafel,faPlus);

export {React, bs, axios, rt, FontAwesomeIcon};