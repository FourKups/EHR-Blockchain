const _deploy_contracts = require('../migrations/2_deploy_contracts');

const ElectronicHealth=artifacts.require("./ElectronicHealth.sol");
var assert=require('chai').assert;

contract('ElectronicHealth',([deployer])=>{
     let electronicHealth;

        beforeEach(async ()=>{
            electronicHealth=await ElectronicHealth.deployed();
        });

        describe('deployement',()=>{
            it('deploys successfully',async ()=>{
                const address=await electronicHealth.address;
                assert.notEqual(address,0x0);
                assert.notEqual(address,'');
                assert.notEqual(address,null);
                assert.notEqual(address,undefined);
            });
        
            it('has a name',async ()=>{
                const name=await electronicHealth.getTitle();
                assert.equal(name,'Electronic Health');
            });

           it('create doctor',async ()=>{
                await electronicHealth.createDoctor(["name1","address1","phone1","email1","specialization1","publicId1"]);
                await electronicHealth.createDoctor(["name2","address2","phone2","email2","specialization2","publicId2"]);
                await electronicHealth.createDoctor(["name3","address3","phone3","email3","specialization3","publicId3"]);
                const doctorCount=await electronicHealth.getDoctorCount();
                assert.equal(doctorCount,3);
                for(let i=1;i<=doctorCount;i++){
                    const doctor=await electronicHealth.getDoctor(i);
                    assert.equal(doctor[0],"name"+i);
                    assert.equal(doctor[1],"address"+i);
                    console.log(doctor[0],doctor[1]);
                }
            });

            it('create patient',async ()=>{
                await electronicHealth.createPatient(["name1","address1","phone1","email1","bloodGroup1","disease1","medicine1","doctor1","date1","report1"]);
                await electronicHealth.createPatient(["name2","address2","phone2","email2","bloodGroup2","disease2","medicine2","doctor2","date2","report2"]);
                await electronicHealth.createPatient(["name3","address3","phone3","email3","bloodGroup3","disease3","medicine3","doctor3","date3","report3"]);
                const patientCount=await electronicHealth.getPatientCount();
                assert.equal(patientCount,3);
                for(let i=1;i<=patientCount;i++){
                    const patient=await electronicHealth.getPatient(i);
                    assert.equal(patient[0],"name"+i);
                    assert.equal(patient[1],"address"+i);
                    
                }
            });

            it('mypatient',async ()=>{
                await electronicHealth.createPatient(["name1","address1","phone1","email1","bloodGroup1","disease1","medicine1","doctor1","date1","report1"]);
                await electronicHealth.createPatient(["name2","address2","phone2","email2","bloodGroup2","disease2","medicine2","doctor2","date2","report2"]);
                await electronicHealth.createPatient(["name3","address3","phone3","email3","bloodGroup3","disease3","medicine3","doctor3","date3","report3"]);
                const myPatient=await electronicHealth.getMyPatients("date1");

                console.log(myPatient[1]);
                assert.equal(myPatient.length,2);
        });

       
    })
})



