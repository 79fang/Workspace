$(".mod-tab .tab").on("click", function () {
  // console.log($(this));

  $(this).addClass("active").siblings().removeClass("active");

  $(this)
    .parents(".mod-tab")
    .find(".panel")
    .eq($(this).index())
    .addClass("active")
    .siblings()
    .removeClass("active");
});
