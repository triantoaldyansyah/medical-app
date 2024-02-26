import React, { useState } from 'react';
import { 
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Heading,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

const TreatmentForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    dateOfTreatment: '',
    treatmentDescription: '',
    medicationsPrescribed: '',
    costOfTreatment: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://patient-restful-api.vercel.app/api/patients', formData);
      console.log('Treatment added:', response.data);
      console.log(formData);
      toast({
        title: 'Form submitted successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding treatment:', error);
      toast({
        title: 'Form submitted unsuccessfully!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleTreatmentDescriptionChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, treatmentDescription: selectedOptions });
  };

  const handleMedicationsPrescribedChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, medicationsPrescribed: selectedOptions });
  };

  return (
    <Box maxWidth="400px" margin="auto" center="true">
      <Heading
        mb={"16px"}
        fontSize={"24px"}
      >
        This is for Patient
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl 
          isRequired
          id="patientName"
          mb={4}
          borderRadius={"8px"}>
            <FormLabel>Patient Name</FormLabel>
            <Input type="text" name="patientName" value={formData.patientName} onChange={handleChange} />
        </FormControl>
        <FormControl
          isRequired
          id="patientId"
          mb={4}
          borderRadius={"8px"}>
            <FormLabel>Patient ID</FormLabel>
            <Input type="text" name="patientId" value={formData.patientId} onChange={handleChange} />
        </FormControl>
        <FormControl
        isRequired
        id="dateOfTreatment"
        mb={4}
        borderRadius={"8px"}
        >
        <FormLabel>Date of Treatment</FormLabel>
        <Input
          type="date"
          name="dateOfTreatment"
          value={formData.dateOfTreatment}
          onChange={handleChange}
        />
        </FormControl>
        <FormControl
          isRequired
          id="treatment"
          mb={4}
          borderRadius={"8px"}>
            <FormLabel>Treatment Description</FormLabel>
            <Select placeholder='Select Treatment' onChange={handleTreatmentDescriptionChange}>
              <option>Express Treatment</option>
              <option>Traditional Treatment</option>
              <option>Modern Treatment</option>
            </Select>
        </FormControl>
        <FormControl
          isRequired
          id="medicationsPrescribed"
          mb={4}
          borderRadius={"8px"}>
            <FormLabel>Medication Prescribed</FormLabel>
            <Select placeholder='Select Medication Prescribed' onChange={handleMedicationsPrescribedChange}>
              <option>Herbal</option>
              <option>Chemical</option>
              <option>Hybrid</option>
            </Select>
        </FormControl>
        <FormControl
          isRequired
          id="costOfTreatment"
          mb={4}
          borderRadius={"8px"}>
            <FormLabel>Cost of Treatment</FormLabel>
            <Input type="number" name="costOfTreatment" value={formData.costOfTreatment} onChange={handleChange} />
        </FormControl>
        <Button colorScheme="blue" type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default TreatmentForm;
