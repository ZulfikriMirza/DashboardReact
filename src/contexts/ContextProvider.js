import React, { createContext, useContext, useState } from 'react';

const stateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    user: false,
    notification: false,
}