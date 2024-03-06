import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    user: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [isClicked, setIsClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setCurrentColor] = useState('#03C9D7')
    const [currentMode, setCurrentMode] = useState('Light')
    const [themeSettings, setThemeSettings] = useState(false)


    const setMode = (e) => {
        setCurrentMode(e.target.value);

        localStorage.setItem('themeMode', e.target.value)

        setThemeSettings(false);
    }


    const setColor = (color) => {
        setCurrentColor(color);

        localStorage.setItem('colorMode', color)

        setThemeSettings(false);
    }

    const handleClick = (clicked) => {
        setIsClicked((prevState) => {
            const updatedState = { ...initialState, [clicked]: true};
            Object.keys(updatedState).forEach((key) => {
                if(key !== clicked) {
                    updatedState[key] = false;
                }
                });
            return updatedState;
        });
    };


    useEffect(() => {
        const handleStateChange = (e) => {
            const clickedInsideChat = e.target.closest('#chat-area')
            
            if(!clickedInsideChat && Object.values(isClicked).some((value) => value)) {
                setIsClicked(initialState)
            }
        }

        document.body.addEventListener('click', handleStateChange);

        return () => {
            document.body.removeEventListener('click', handleStateChange);
        }
    }, [isClicked, initialState]);

    return (
        <StateContext.Provider
            value={{ 
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                currentColor, currentMode,
                themeSettings, setThemeSettings,
                setMode, setColor
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);