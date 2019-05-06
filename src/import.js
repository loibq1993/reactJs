import React from 'react';
import * as bs from 'react-bootstrap';
import axios from 'axios';
import * as rt from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel,faPlus);

export {React, bs, axios, rt, FontAwesomeIcon};