function set(x) {
  return x * x;
}

let x = 10;
for (let i = 0; i < 10; i += 1) {
  x += 10;
}

set(x);
