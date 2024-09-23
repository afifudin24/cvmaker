const { formatNamedParameters } = require('sequelize/lib/utils');
const { CV } = require('../models');

const CVController = {
  getCVByUserId: async (req, res) => {
    const { id } = req.params;
    try {
      const cv = await CV.findAll({ where: { userId: id } });

      if (cv.length <= 0) {
        return res.status(404).json({ message: 'Not Found' });
      }
      const dataWithParsedJSON = cv.map((item) => ({
        ...item.dataValues,
        skills: JSON.parse(item.skills), // Mengonversi kembali menjadi array objek
        education: JSON.parse(item.education), // Mengonversi kembali menjadi array objek
        experience: JSON.parse(item.experience), // Mengonversi kembali menjadi array objek
      }));
      console.log(dataWithParsedJSON);

      res.json({
        message: 'Success Get CV',
        data: dataWithParsedJSON,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  createCV: async (req, res) => {
    const {
      userId,
      name,
      description,
      skills,
      education,
      experience,
    } = req.body;
    try {
      const skillsJSONString = JSON.stringify(skills);
      const educationJSONString = JSON.stringify(education);
      const experienceJSONString = JSON.stringify(experience);
      console.log(skillsJSONString);
      const newCv = await CV.create({
        userId,
        name,
        description,
        skills: skillsJSONString, // Menggunakan 'skills' alih-alih 'skillsJSONString'
        education: educationJSONString, // Menggunakan 'education' alih-alih 'educationJSONString'
        experience: experienceJSONString, // Menggunakan 'experience' alih-alih 'experienceJSONString'
      });
      if (newCv) {
        res.json({
          message: 'Success Create CV',
          data: newCv,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

module.exports = CVController;
