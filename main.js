const n = 29;
var visited;
let t = 100;
// let time_increament;
// start end intialization
let s = { i: 7, j: 7 };
let e = { i: 20, j: 20 };
function creatediv() {
  var g = document.getElementById("grid");
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      var x = document.createElement("div");
      x.setAttribute("id", i + "|" + j);
      x.setAttribute("class", "cell");
      g.appendChild(x);
    }
  }
  // t=100;
}
function createmaz() {
  visited = new Array(n);
  for (let i = 0; i < n; i++) {
    visited[i] = new Array(n);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let x = Math.floor(Math.random() * 3 + 1);
      if (x == 1 && !(i == s.i && j == s.j) && !(i == e.i && j == e.j)) {
        visited[i][j] = 2;
        let c = document.getElementById(i + "|" + j);
        c.classList.add("blocked");
      } else {
        visited[i][j] = 0;
      }
    }
  }
  t = 100;
}
creatediv();
createmaz();
function clearnodes(){
  document.getElementById("nodes_visited_BSF").innerHTML = "BSF : " + 0;
  document.getElementById("nodes_visited_DSF").innerHTML = "DSF : " + 0;
  document.getElementById("nodes_visited_A*").innerHTML = "A* : " + 0;
  document.getElementById("nodes_visited_BD_BSF").innerHTML = "BD_BSF : " + 0;
}
function randmize() {
  disablebuttons();
  clearnodes();
  t = 100;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let c = document.getElementById(i + "|" + j);
      if (c.classList.contains("blocked")) {
        c.classList.remove("blocked");
      }
    }
  }
  clearemaz();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      visited[i][j] = 0;
      let x = Math.floor(Math.random() * 3 + 1);
      if (x == 1 && !(i == s.i && j == s.j) && !(i == e.i && j == e.j)) {
        visited[i][j] = 2;
        setTimeout(
          (i, j) => {
            let c = document.getElementById(i + "|" + j);
            c.classList.add("blocked");
          },
          t,
          i,
          j
        );
        t += 100;
      } else {
        visited[i][j] = 0;
      }
    }
    t = 100;
  }
  setTimeout(enablebuttons, t + 1000);

}
function clearemaz() {
  clranimation();
}
function clranimation() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let c = document.getElementById(i + "|" + j);
      if (c.classList.contains("visited")) {
        c.classList.remove("visited");
      }
      if (c.classList.contains("final")) {
        c.classList.remove("final");
      }
    }
  }
  t = 100;
  exist = 0;
}
let temp = document.getElementById(s.i + "|" + s.j);
temp.classList.add("start");
temp = document.getElementById(e.i + "|" + e.j);
temp.classList.add("start");
let exist = 0;
////////////////////////////////////////
// animations
function printpath(path) {
  let y;
  for (let x = 0; x < path.length; x++) {
    y = setTimeout(
      (p, q) => {
        let c = document.getElementById(p + "|" + q);
        c.classList.remove("visited");
        c.classList.add("final");
      },
      t,
      path[x].i,
      path[x].j
    );
    t += 100;
  }
}
function anime(animate) {
  let c = 0;
  for (let i = 0; i < animate.length; i++) {
    if (animate[i].x == 1) c++;
  }

  for (let i = 0; i < animate.length; i++) {
    if (animate[i].x == 1) {
      setTimeout(
        (p, q) => {
          let c = document.getElementById(p + "|" + q);
          c.classList.add("visited");
        },
        t,
        animate[i].i,
        animate[i].j
      );
    } else {
      setTimeout(
        (p, q) => {
          let c = document.getElementById(p + "|" + q);
          c.classList.remove("visited");
        },
        t,
        animate[i].i,
        animate[i].j
      );
    }
    t += 30;
  }
  setTimeout(() => {
    document.getElementById("nodes_visited_DSF").innerHTML = "DSF: " + c;
  }, t);
  if (!exist) {
    setTimeout(() => {
      alert("PATH NOT FOUND");
    }, t + 100);
  }
}
function a(animate) {
  let y;
  for (let x = 0; x < animate.length; x++) {
    y = setTimeout(
      (p, q) => {
        let c = document.getElementById(p + "|" + q);
        c.classList.add("visited");
      },
      t,
      animate[x].i,
      animate[x].j
    );
    t += 20;
  }
  if (!exist) {
    setTimeout(() => {
      alert("PATH NOT FOUND");
    }, t + 100);
  }
  // t=100;
}
function putpathBDBFS(parent, parent1, node) {
  let path = new Array();
  let path1 = new Array();
  let curr = node;
  let curr1 = node;
  while (parent[curr.i][curr.j].i != -1 && parent[curr.i][curr.j].j != -1) {
    if (curr.i == s.i && curr.j == s.j) break;
    path.push(curr);
    curr = parent[curr.i][curr.j];
  }

  while (
    parent1[curr1.i][curr1.j].i != -1 &&
    parent1[curr1.i][curr1.j].j != -1
  ) {
    if (curr1.i == e.i && curr1.j == e.j) break;
    path1.push(curr1);
    curr1 = parent1[curr1.i][curr1.j];
  }
  path.reverse();
  for (let i = 0; i < path1.length; i++) {
    path.push(path1[i]);
  }
  // path.reverse();
  printpath(path);
}
// algorithm
function bsf() {
  clearemaz();
  disablebuttons();
  t = 100;
  let animate = new Array();
  let queue = new Array();
  let parent = new Array(n);
  let path = new Array();
  let vis = new Array(n);
  for (let i = 0; i < n; i++) {
    vis[i] = new Array(n);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      vis[i][j] = visited[i][j];
    }
  }
  for (let i = 0; i < n; i++) {
    parent[i] = new Array(n);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      parent[i][j] = { i: -1, j: -1 };
    }
  }
  queue.push(s);
  vis[s.i][s.j] = 1;
  while (queue.length != 0) {
    let x = queue.length;
    while (x--) {
      let curr = queue.shift();
      animate.push(curr);
      if (curr.i == e.i && curr.j == e.j) {
        exist = 1;
        a(animate);
        putpath(parent, path);
        setTimeout(enablebuttons, t);
        setTimeout(() => {
          document.getElementById("nodes_visited_BSF").innerHTML =
            "BSF: " + animate.length;
        }, t);

        return;
      }
      var up = { i: curr.i + 1, j: curr.j };
      var down = { i: curr.i - 1, j: curr.j };
      var left = { i: curr.i, j: curr.j - 1 };
      var right = { i: curr.i, j: curr.j + 1 };
      if (isvalid(up, vis)) {
        queue.push(up);
        parent[up.i][up.j] = { i: curr.i, j: curr.j };
        vis[up.i][up.j] = 1;
      }
      if (isvalid(down, vis)) {
        queue.push(down);
        parent[down.i][down.j] = { i: curr.i, j: curr.j };
        vis[down.i][down.j] = 1;
      }
      if (isvalid(left, vis)) {
        queue.push(left);
        parent[left.i][left.j] = { i: curr.i, j: curr.j };
        vis[left.i][left.j] = 1;
      }
      if (isvalid(right, vis)) {
        queue.push(right);
        parent[right.i][right.j] = { i: curr.i, j: curr.j };
        vis[right.i][right.j] = 1;
      }
    }
  }
  a(animate);
  setTimeout(enablebuttons, t);
  setTimeout(() => {
    document.getElementById("nodes_visited_BSF").innerHTML =
      "BSF: " + animate.length;
  }, t);
  return;
}
function dsf() {
  clearemaz();
  disablebuttons();
  let animate = new Array();
  let vis = new Array(n);
  for (let i = 0; i < n; i++) {
    vis[i] = new Array(n);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      vis[i][j] = visited[i][j];
    }
  }
  dosf(s, vis, animate);
  anime(animate);
  setTimeout(enablebuttons, t);
  return;
}
function dosf(curr, vis, animate) {
  if (curr.i == e.i && curr.j == e.j) {
    exist = 1;
    return;
  }
  if (exist) return;
  animate.push({ i: curr.i, j: curr.j, x: 1 });
  var up = { i: curr.i + 1, j: curr.j };
  var down = { i: curr.i - 1, j: curr.j };
  var left = { i: curr.i, j: curr.j - 1 };
  var right = { i: curr.i, j: curr.j + 1 };
  if (isvalid(up, vis)) {
    vis[up.i][up.j] = 1;
    dosf(up, vis, animate);
    if (!exist) animate.push({ i: up.i, j: up.j, x: 0 });
  }
  if (isvalid(down, vis)) {
    vis[down.i][down.j] = 1;

    dosf(down, vis, animate);

    if (!exist) animate.push({ i: down.i, j: down.j, x: 0 });
  }
  if (isvalid(left, vis)) {
    vis[left.i][left.j] = 1;

    dosf(left, vis, animate);

    if (!exist) animate.push({ i: left.i, j: left.j, x: 0 });
  }
  if (isvalid(right, vis)) {
    vis[right.i][right.j] = 1;

    dosf(right, vis, animate);
    if (!exist) animate.push({ i: right.i, j: right.j, x: 0 });
  }
  return;
}
function A_star() {
  clearemaz();
  disablebuttons();
  t = 100;
  let animate = new Array();
  let parent = new Array(n);
  let path = new Array();

  let queue = new Array();
  let vis = new Array(n);
  let huiristic = new Array(n + 1);
  for (let i = 0; i < n; i++) {
    vis[i] = new Array(n);
    huiristic[i] = new Array(n + 1);
  }
  huiristic[n] = new Array(n + 1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      vis[i][j] = visited[i][j];
      huiristic[i][j] = Math.abs(e.i - i) + Math.abs(e.j - j);
    }
  }
  for (let i = 0; i < n; i++) {
    parent[i] = new Array(n);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      parent[i][j] = { i: -1, j: -1 };
    }
  }
  queue.push({ i: s.i, j: s.j, cval: 0, h: huiristic[s.i][s.j], total: 0 });
  while (queue.length > 0) {
    queue.sort((a, b) => a.total - b.total);
    let curr = queue.shift();
    animate.push(curr);
    if (curr.i == e.i && curr.j == e.j) {
      exist = 1;
      a(animate);
      setTimeout(() => {
        document.getElementById("nodes_visited_A*").innerHTML =
          "A* : " + animate.length;
      }, t);
      putpath(parent, path);
      setTimeout(enablebuttons, t);
      return;
    }
    var up = { i: curr.i + 1, j: curr.j, cval: curr.cval + 1, h: 0, total: 0 };
    var down = {
      i: curr.i - 1,
      j: curr.j,
      cval: curr.cval + 1,
      h: 0,
      total: 0,
    };
    var left = {
      i: curr.i,
      j: curr.j - 1,
      cval: curr.cval + 1,
      h: 0,
      total: 0,
    };
    var right = {
      i: curr.i,
      j: curr.j + 1,
      cval: curr.cval + 1,
      h: 0,
      total: 0,
    };
    if (isvalid(up, vis)) {
      up.h = huiristic[curr.i + 1][curr.j];
      up.total = up.h + up.cval;
      queue.push(up);
      parent[up.i][up.j] = { i: curr.i, j: curr.j };
      vis[up.i][up.j] = 1;
    }
    if (isvalid(down, vis)) {
      down.h = huiristic[curr.i - 1][curr.j];
      down.total = down.h + down.cval;
      queue.push(down);
      parent[down.i][down.j] = { i: curr.i, j: curr.j };
      vis[down.i][down.j] = 1;
    }
    if (isvalid(left, vis)) {
      left.h = huiristic[curr.i][curr.j - 1];
      left.total = left.h + left.cval;
      queue.push(left);
      parent[left.i][left.j] = { i: curr.i, j: curr.j };
      vis[left.i][left.j] = 1;
    }
    if (isvalid(right, vis)) {
      right.h = huiristic[curr.i][curr.j + 1];
      right.total = right.h + right.cval;
      queue.push(right);
      parent[right.i][right.j] = { i: curr.i, j: curr.j };
      vis[right.i][right.j] = 1;
    }
  }
  a(animate);
  setTimeout(enablebuttons, t);
  setTimeout(() => {
    document.getElementById("nodes_visited_A*").innerHTML =
      "A* : " + animate.length;
  }, t);
  return;
}

function bi_BSF() {
  clearemaz();
  disablebuttons();
  let animate = new Array();
  t = 100;
  let queue1 = new Array();
  let queue2 = new Array();
  let parent = new Array(n);
  let parent1 = new Array(n);
  let vis1 = new Array(n);
  let vis2 = new Array(n);
  for (let i = 0; i < n; i++) {
    vis1[i] = new Array(n);
    vis2[i] = new Array(n);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      vis1[i][j] = visited[i][j];
      vis2[i][j] = visited[i][j];
    }
  }
  for (let i = 0; i < n; i++) {
    parent[i] = new Array(n);
    parent1[i] = new Array(n);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      parent[i][j] = { i: -1, j: -1 };
      parent1[i][j] = { i: -1, j: -1 };
    }
  }
  queue1.push(s);
  queue2.push(e);
  while (queue1.length > 0 && queue2.length > 0) {
    let x = queue1.length;
    let y = queue2.length;
    while (x--) {
      let curr = queue1.shift();
      animate.push(curr);
      if ((curr.i == e.i && curr.j == e.j) || vis2[curr.i][curr.j]) {
        exist = 1;
        a(animate);
        // putpath(parent, path);
        putpathBDBFS(parent, parent1, curr);
        setTimeout(enablebuttons, t);
        setTimeout(() => {
          document.getElementById("nodes_visited_BD_BSF").innerHTML =
            "BD_BSF : " + animate.length;
        }, t);

        return;
      }
      var up = { i: curr.i + 1, j: curr.j };
      var down = { i: curr.i - 1, j: curr.j };
      var left = { i: curr.i, j: curr.j - 1 };
      var right = { i: curr.i, j: curr.j + 1 };
      if (isvalid(up, vis1)) {
        queue1.push(up);
        parent[up.i][up.j] = { i: curr.i, j: curr.j };
        vis1[up.i][up.j] = 1;
      }
      if (isvalid(down, vis1)) {
        queue1.push(down);
        parent[down.i][down.j] = { i: curr.i, j: curr.j };
        vis1[down.i][down.j] = 1;
      }
      if (isvalid(left, vis1)) {
        queue1.push(left);
        parent[left.i][left.j] = { i: curr.i, j: curr.j };
        vis1[left.i][left.j] = 1;
      }
      if (isvalid(right, vis1)) {
        queue1.push(right);
        parent[right.i][right.j] = { i: curr.i, j: curr.j };
        vis1[right.i][right.j] = 1;
      }
    }
    while (y--) {
      let curr = queue2.shift();
      animate.push(curr);
      if ((curr.i == s.i && curr.j == s.j) || vis1[curr.i][curr.j]) {
        exist = 1;
        a(animate);
        // putpath(parent, path);
        putpathBDBFS(parent, parent1, curr);
        setTimeout(enablebuttons, t);
        return;
      }
      var up = { i: curr.i + 1, j: curr.j };
      var down = { i: curr.i - 1, j: curr.j };
      var left = { i: curr.i, j: curr.j - 1 };
      var right = { i: curr.i, j: curr.j + 1 };
      if (isvalid(up, vis2)) {
        queue2.push(up);
        parent1[up.i][up.j] = { i: curr.i, j: curr.j };
        vis2[up.i][up.j] = 1;
      }
      if (isvalid(down, vis2)) {
        queue2.push(down);
        parent1[down.i][down.j] = { i: curr.i, j: curr.j };
        vis2[down.i][down.j] = 1;
      }
      if (isvalid(left, vis2)) {
        queue2.push(left);
        parent1[left.i][left.j] = { i: curr.i, j: curr.j };
        vis2[left.i][left.j] = 1;
      }
      if (isvalid(right, vis2)) {
        queue2.push(right);
        parent1[right.i][right.j] = { i: curr.i, j: curr.j };
        vis2[right.i][right.j] = 1;
      }
    }
  }
  a(animate);
  setTimeout(enablebuttons, t);
  setTimeout(() => {
    document.getElementById("nodes_visited_BD_BSF").innerHTML =
      "BD_BSF : " + animate.length;
  }, t);
  return;
}

// supporting
function isvalid(node, vis) {
  return (
    node.i < n &&
    node.j < n &&
    node.i >= 0 &&
    node.j >= 0 &&
    !vis[node.i][node.j]
  );
}
function putpath(parent, path) {
  let curr = e;
  let end = {
    i: -1,
    j: -1,
  };
  let count = 0;
  while (parent[curr.i][curr.j].i != -1 && parent[curr.i][curr.j].j != -1) {
    if (curr.i == s.i && curr.j == s.j) break;
    path.push(curr);
    curr = parent[curr.i][curr.j];
  }
  path.reverse();
  printpath(path);
}
function disablebuttons() {
  document.getElementById("bsf").disabled = true;
  document.getElementById("dsf").disabled = true;
  document.getElementById("rnd").disabled = true;
  document.getElementById("clc").disabled = true;
  document.getElementById("A_star").disabled = true;
  document.getElementById("bi_BSF").disabled = true;
}
function enablebuttons() {
  document.getElementById("bsf").disabled = false;
  document.getElementById("dsf").disabled = false;
  document.getElementById("rnd").disabled = false;
  document.getElementById("clc").disabled = false;
  document.getElementById("bi_BSF").disabled = false;
  document.getElementById("A_star").disabled = false;
}
