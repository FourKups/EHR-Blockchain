// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <8.10.0;

//pragma experimental ABIEncoderV2;

contract ElectronicHealth {
    uint256 private _patientCount = 0;
    uint256 private _doctorCount = 0;
    string private _admin = "0xc34b5C9740E9d8d5d649C5bbd6a20a15FE766557";
    string private _title;

    mapping(uint256 => Patient) public Patients;
    mapping(uint256 => Doctor) public Doctors;

    struct Patient {
        uint256 id;
        string[] pDetails;
    }

    struct Doctor {
        uint256 id;
        string[] dDetails;
    }

    event PatientCreated(uint256 id, string[] pDetails);
    event DoctorCreated(uint256 id, string[] dDetails);

    constructor() public {
        _title = "Electronic Health";
    }

    function getTitle() public view returns (string memory) {
        return _title;
    }

    function getPatientCount() public view returns (uint256) {
        return _patientCount;
    }

    function getDoctorCount() public view returns (uint256) {
        return _doctorCount;
    }

    function getAdmin() public view returns (string memory) {
        return _admin;
    }

    function getDoctor(uint256 id) public view returns (string[] memory) {
        return Doctors[id].dDetails;
    }

    function getPatient(uint256 id) public view returns (string[] memory) {
        return Patients[id].pDetails;
    }

    function createPatient(string[] memory _pDetails) public {
        _patientCount++;
        Patients[_patientCount] = Patient(_patientCount, _pDetails);
        emit PatientCreated(_patientCount, _pDetails);
    }

    function createDoctor(string[] memory _dDetails) public {
        _doctorCount++;
        Doctors[_doctorCount] = Doctor(_doctorCount, _dDetails);
        emit DoctorCreated(_doctorCount, _dDetails);
    }

    function getMyPatients(string memory publicId)
        public
        view
        returns (uint256[] memory)
    {
        uint256 j = 0;
        uint256[] memory _myPatients = new uint256[](
            getmypatientCount(publicId)
        );
        for (uint256 i = 1; i <= _patientCount; i++) {
            if (
                keccak256(abi.encodePacked(publicId)) ==
                keccak256(abi.encodePacked(Patients[i].pDetails[9]))
            ) {
                _myPatients[j] = Patients[i].id;
                j++;
            }
        }
        //_myPatients[0] = 1;

        return _myPatients;
    }

    function getmypatientCount(string memory publicId)
        public
        view
        returns (uint256)
    {
        uint256 j = 0;
        for (uint256 i = 1; i <= _patientCount; i++) {
            if (
                keccak256(abi.encodePacked(publicId)) ==
                keccak256(abi.encodePacked(Patients[i].pDetails[9]))
            ) {
                j++;
            }
        }
        return j;
    }
}
