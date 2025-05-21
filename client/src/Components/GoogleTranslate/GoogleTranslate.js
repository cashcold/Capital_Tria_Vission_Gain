import React from "react";
import "./GoogleTranslate.css";

class GoogleTranslate extends React.Component {
  componentDidMount() {
    // Clean any existing translate script
    const existingScript = document.getElementById("google-translate-script");
    if (existingScript) existingScript.remove();

    // Add the Google Translate script
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Global init function for Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }

  render() {
    return (
      <div className="translate-wrapper">
        <label className="translate-label">🌍 Select Language</label>
        <div id="google_translate_element" className="translate-element"></div>
      </div>
    );
  }
}

export default GoogleTranslate;
