function withPlaceholderText() {
    this.defaultAttrs({
        showPlaceholderClass: "is-showPlaceholder"
    }),
    this.determinePlaceholderVisibility = function() {
        var a = this.getVisibleText().trim();
        this.$text.toggleClass(this.attr.showPlaceholderClass, !a)
    }
    ,
    this.after("initialize", function() {
        this.determinePlaceholderVisibility(),
        this.on("uiTextChanged", this.determinePlaceholderVisibility)
    })
}

// limit textarea rows
(function(){
    var keynum, lines = 1;

     function limitLines(obj, e) {
       // IE
       if(window.event) {
         keynum = e.keyCode;
       // Netscape/Firefox/Opera
       } else if(e.which) {
         keynum = e.which;
       }

       if(keynum == 13) {
         if(lines == obj.rows) {
           return false;
         }else{
           lines++;
         }
       }
     }
})();