if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("serviceWorker.js").catch(function(err) {
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}
