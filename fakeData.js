const {faker}=require('@faker-js/faker')

async function main(){
    const leads = []
    for (let i=0;i<10;i++){
        const newLead = {
            title:"Mr",
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName(),
            jobTitle:faker.name.jobTitle()
        }
        leads.push(newLead)
    }
}
module.exports = main();
