(function () {
    class CustomText extends HTMLElement {
      static get observedAttributes() {
        return ["text"];
      }
  
      constructor() {
        super();
        this.text = "";
        this.attachShadow({ mode: "open" });
        this.onclick = this.onClick;
      }
  
      connectedCallback() {
        this.text = this.getAttribute("text");
        this.render();
      }
  
      render() {
        this.shadowRoot.innerHTML = `<div>${this.text}</div>`;
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
        this.getAttribute("text")
          ? (this.text = this.getAttribute("text"))
          : null;
        this.render();
      }
    }
  
    customElements.define("custom-text", CustomText);
})();
  