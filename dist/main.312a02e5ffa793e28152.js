!(function () {
  "use strict";
  const e = document.querySelector(".start"),
    t = document.querySelector(".game"),
    n = document.querySelector(".start-button"),
    i = document.querySelector(".restart-game"),
    r = document.querySelector(".view-statistics"),
    o = document.querySelector(".block"),
    l = document.querySelector(".check");
  let c = {
      numItemArray: u(),
      checkArray: [],
      isBuild: !1,
      isWin: !1,
      timerId: 0,
    },
    s = { time: 60, result: "", isBest: !1 },
    d = [];
  function u() {
    let e = [];
    for (let t = 1; t <= 25; t++) e.push(t);
    return e;
  }
  function a() {
    let e,
      t = m(c.numItemArray);
    for (let n = 0; n < 25; n++)
      (e = document.createElement("div")),
        e.classList.add("item"),
        (e.id = t.pop()),
        (e.innerText = e.id),
        (e.style += y()),
        o.appendChild(e),
        console.log(`Add item ${n} from id ${e.id}`);
    document.querySelectorAll(".item").forEach((e) => {
      e.addEventListener("click", () => {
        console.log(e.id),
          (function (e) {
            0 === c.checkArray.length && 1 == e
              ? (document.getElementById(e).classList.add("green"),
                c.checkArray.push(e),
                console.log("push ", c.checkArray))
              : c.checkArray[e - 2] == e - 1 && 25 == e
              ? (document.getElementById(e).classList.add("green"),
                (c.isWin = !0),
                h())
              : c.checkArray[e - 2] == e - 1
              ? (document.getElementById(e).classList.add("green"),
                c.checkArray.push(e),
                console.log("push ", c.checkArray))
              : (document.getElementById(e).classList.add("red"),
                (c.isWin = !1),
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
            ? ((s.time = 0),
              (document.querySelector("#time").innerHTML = 0),
              (c.isWin = !1),
              h())
            : ((document.querySelector("#time").innerHTML = e--),
              (s.time = document.querySelector("#time").innerHTML));
        }, 1e3);
        c.timerId = t;
      })(),
      (c.isBuild = !0);
  }
  n.addEventListener("click", () => {
    c.isBuild ||
      ((e.style = "visibility: hidden; position: fixed;"),
      (t.style = "visibility: visible;"),
      a());
  }),
    i.addEventListener("click", () => {
      (l.style = "visibility: hidden;"),
        clearInterval(c.timerId),
        (c = {
          numItemArray: u(),
          checkArray: [],
          isBuild: !1,
          isWin: !1,
          timerId: 0,
        }),
        r.addEventListener("click", () => {
          (document.querySelector(".table").style = "visibility: visible;"),
            console.log("view");
        }),
        (s = { time: 60, result: "", isBest: !1 }),
        document.querySelectorAll(".item").forEach((e) => {
          e.remove();
        }),
        a(),
        console.log("remove");
    });
  const m = (e) => e.sort(() => Math.round(25 * Math.random()) - 13);
  function y() {
    let e = `\n\tfont-weight:${
      "" + 100 * Math.round(8 * Math.random() + 1)
    };\n\tfont-size:${Math.round(
      16 * Math.random() + 14
    )}px;\n\tcolor:${(function () {
      let e = "",
        t = Math.floor(256 * Math.random()),
        n = Math.floor(256 * Math.random()),
        i = Math.floor(256 * Math.random());
      return (
        t < 80 && (t += 2 * t),
        n < 80 && (n += 2 * n),
        i < 80 && (i += 2 * i),
        (e = `#${t.toString(16)}${n.toString(16)}${i.toString(16)}`),
        e
      );
    })()};\n\t`;
    return console.log(e), e;
  }
  function h() {
    switch (
      (clearInterval(c.timerId),
      document.querySelectorAll(".item").forEach((e) => {
        e.classList.add("remove");
      }),
      c.isWin)
    ) {
      case !1:
        (l.innerHTML = "Lose"),
          (l.style = "visibility: visible;"),
          console.log("GAME OVER!");
        break;
      case !0:
        (l.innerHTML = "Win"),
          (l.style = "visibility: visible;"),
          console.log("YOU WIN!");
    }
    (s.result = l.innerHTML),
      (function () {
        d.push(s);
        let e = "index" + d.length,
          t = d.length;
        const n = document.createElement("tr");
        n.classList.add(e), document.querySelector("table").appendChild(n);
        const i = document.createElement("td"),
          r = document.createElement("td"),
          o = document.createElement("td");
        i.classList.add("time" + t),
          r.classList.add("result" + t),
          o.classList.add("is-best" + t);
        let l = `.${e}`;
        document.querySelector(l).appendChild(i),
          document.querySelector(l).appendChild(r),
          document.querySelector(l).appendChild(o),
          (document.querySelector(".time" + t).innerHTML =
            d[d.length - 1].time),
          (document.querySelector(".result" + t).innerHTML =
            d[d.length - 1].result),
          (document.querySelector(".is-best" + t).innerHTML =
            d[d.length - 1].isBest);
      })();
  }
})();
