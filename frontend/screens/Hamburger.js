import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Hamburger.css';

const Hamburger = ({ items, logoSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <div className="menu-header">
        {logoSrc && <img src={logoSrc} alt="Logo" className="logo" />}
        <button className="hamburger-button" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        {items.map(item => (
          <div key={item.id} className="menu-item">
            {item.subItems ? (
              <>
                <span>{item.label}</span>
                <div className="submenu">
                  {item.subItems.map(subItem => (
                    <div key={subItem.id} className="submenu-item">
                      {subItem.subItems ? (
                        <div>{subItem.label}</div>
                      ) : (
                        <Link to={subItem.action} className="link" onClick={closeMenu}>
                          {subItem.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Link to={item.action} className="link" onClick={closeMenu}>
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hamburger;
