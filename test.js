console.log("==================Begin test==================")

var data = "want.to.be.testing.zip"

data = data.substr(0, data.lastIndexOf(".")) + "_"+ data.substr(data.lastIndexOf(".") + "_".length)

console.log(data)

console.log("=================Finish test==================")