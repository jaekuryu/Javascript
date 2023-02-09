function process() {
  let inputString = document.getElementById("inputString").value;
  let RegString = document.getElementById("RegString").value;
  console.log(RegString);
  let regex = new RegExp(RegString.replace(/'/g,'').replace(/\//g,''),'g');
  console.log(regex);
  let RegOperator = document.getElementById("RegOperator").value;
  let result = "";
  switch(RegOperator) {
    case "test":
      result = regex.test(inputString);
      result = result.toString();
      break;
    case "exec":
      result = regex.exec(inputString);
      console.log(result);
      break;
    case "match":
      result = inputString.match(regex);
      console.log(result);
      break;
    case "search":
      result = inputString.search(regex);
      result = result.toString();
      break;
    case "replace":
      result = inputString.replace(regex, "replacement string");
      break;
    case "split":
      result = inputString.split(regex);
      console.log(result);
      break;
    default:
      result = "Invalid operator";
  }
  document.getElementById("Result").value = result;
}
