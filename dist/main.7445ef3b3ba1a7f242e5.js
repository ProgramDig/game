!(function () {
  "use strict";
  const e = document.querySelector(".start"),
    t = document.querySelector(".game"),
    n = document.querySelector(".start-button"),
    r = document.querySelector(".restart-game"),
    i = document.querySelector(".block"),
    o = document.querySelector(".check");
  let l = {
      numItemArray: d(),
      checkArray: [],
      isBuild: !1,
      isWin: !1,
      timerId: 0,
    },
    c = { time: 60, result: "", isBest: !1 },
    s = [];
  function d() {
    let e = [];
    for (let t = 1; t <= 25; t++) e.push(t);
    return e;
  }
  function u() {
    let e,
      t = a(l.numItemArray);
    for (let n = 0; n < 25; n++)
      (e = document.createElement("div")),
        e.classList.add("item"),
        (e.id = t.pop()),
        (e.innerText = e.id),
        (e.style += m()),
        i.appendChild(e),
        console.log(`Add item ${n} from id ${e.id}`);
    document.querySelectorAll(".item").forEach((e) => {
      e.addEventListener("click", () => {
        console.log(e.id),
          (function (e) {
            0 === l.checkArray.length && 1 == e
              ? (document.getElementById(e).classList.add("green"),
                l.checkArray.push(e),
                console.log("push ", l.checkArray))
              : l.checkArray[e - 2] == e - 1 && 25 == e
              ? (document.getElementById(e).classList.add("green"),
                (l.isWin = !0),
                h())
              : l.checkArray[e - 2] == e - 1
              ? (document.getElementById(e).classList.add("green"),
                l.checkArray.push(e),
                console.log("push ", l.checkArray))
              : (document.getElementById(e).classList.add("red"),
                (l.isWin = !1),
                h());
          })(e.id);
      });
    }),
      console.log("The game is built."),
      (function () {
        let e = 60;
        console.log("Timer started.");
        let t = setInterval(() => {
          0 == e
            ? ((document.querySelector("#time").innerHTML = 0),
              (l.isWin = !1),
              h())
            : ((document.querySelector("#time").innerHTML = e--),
              (c.time = document.querySelector("#time").innerHTML));
        }, 1e3);
        l.timerId = t;
      })(),
      (l.isBuild = !0);
  }
  n.addEventListener("click", () => {
    l.isBuild ||
      ((e.style = "visibility: hidden; position: fixed;"),
      (t.style = "visibility: visible;"),
      u());
  }),
    r.addEventListener("click", () => {
      (o.style = "visibility: hidden;"),
        clearInterval(l.timerId),
        (l = {
          numItemArray: d(),
          checkArray: [],
          isBuild: !1,
          isWin: !1,
          timerId: 0,
        }),
        (c = { time: 60, result: "", isBest: !1 }),
        document.querySelectorAll(".item").forEach((e) => {
          e.remove();
        }),
        u(),
        console.log("remove");
    });
  const a = (e) => e.sort(() => Math.round(25 * Math.random()) - 13);
  function m() {
    let e = `\n\tfont-weight:${
      "" + 100 * Math.round(8 * Math.random() + 1)
    };\n\tfont-size:${Math.round(
      16 * Math.random() + 14
    )}px;\n\tcolor:${(function () {
      let e = "",
        t = Math.floor(256 * Math.random()),
        n = Math.floor(256 * Math.random()),
        r = Math.floor(256 * Math.random());
      return (e = `#${t.toString(16)}${n.toString(16)}${r.toString(16)}`), e;
    })()};\n\t`;
    return console.log(e), e;
  }
  function h() {
    switch (
      (clearInterval(l.timerId),
      document.querySelectorAll(".item").forEach((e) => {
        e.classList.add("remove");
      }),
      l.isWin)
    ) {
      case !1:
        (o.innerHTML = "You Lose"),
          (o.style = "visibility: visible;"),
          console.log("GAME OVER!");
        break;
      case !0:
        (o.innerHTML = "You Win"),
          (o.style = "visibility: visible;"),
          console.log("YOU WIN!");
    }
    (c.result = o.innerHTML),
      (function () {
        s.push(c);
        let e = "index" + s.length,
          t = s.length;
        const n = document.createElement("tr");
        n.classList.add(e), document.querySelector("table").appendChild(n);
        const r = document.createElement("td"),
          i = document.createElement("td"),
          o = document.createElement("td");
        r.classList.add("time" + t),
          i.classList.add("result" + t),
          o.classList.add("is-best" + t);
        let l = `.${e}`;
        document.querySelector(l).appendChild(r),
          document.querySelector(l).appendChild(i),
          document.querySelector(l).appendChild(o),
          (document.querySelector(".time" + t).innerHTML =
            s[s.length - 1].time),
          (document.querySelector(".result" + t).innerHTML =
            s[s.length - 1].result),
          (document.querySelector(".is-best" + t).innerHTML =
            s[s.length - 1].isBest);
      })();
  }
})();
