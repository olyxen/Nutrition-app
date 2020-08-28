import React from 'react';

function Footer() {
  return (
      <div className="container">
        <span className="footerText">Developed by <a href="https://github.com/PapakonstantinouE">Eleftheria</a> & <a href="https://github.com/olyxen">Olympia</a> </span>
          <a href="https://platform.fatsecret.com" style={{float: "right"}}>
            <img src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.png" srcset="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_2x.png 2x, https://platform.fatsecret.com/api/static/images/powered_by_fatsecret_3x.png 3x" border="0"/>
          </a>
      </div>
  );
}

export default Footer;