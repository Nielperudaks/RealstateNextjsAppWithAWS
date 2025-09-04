module.exports = {
    apps:[
       {
         name: "realestate",
         script: "npm",
         args: "run dev",
         env: {
            NODE_ENV: "development"
         }
       }

    ]
}