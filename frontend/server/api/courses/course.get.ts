const res = fetch(
  "https://userdoc.informatik.haw-hamburg.de/doku.php?id=stundenplan:ics_public"
)
  .then((result) => result.text())
  .then((text) => console.log(text));
