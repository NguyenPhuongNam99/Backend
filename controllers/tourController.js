const Tour = require("../models/tour");
const TourSchedule = require("../models/tour_schedule");

const tourController = {
  creatTour: async (req, res) => {
    try {
      const {
        tour_name,
        description,
        price,
        thumbnail,
        provinces,
        city,
        restaurant_id,
        hotel_id,
        is_show,
        time_line,
      } = req.body;

      const newCreate = await Tour({
        tour_name,
        description,
        price,
        thumbnail,
        provinces,
        city,
        restaurant_id,
        hotel_id,
        is_show,
      });
      const creatTour = await newCreate.save();

      time_line.map(async (item) => {
        const newCreateSchedule = await TourSchedule({
          day: item.day,
          schedule: item.schedule,
          tour_id: creatTour.idTour,
        });
        await newCreateSchedule.save();
      });

      res.status(200).json({ creatTour });
    } catch (error) {
      console.log("error", error);
      res.status(500).json(error);
    }
  },

  updateTour: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        _id,
        tour_id,
        tour_name,
        description,
        price,
        thumbnail,
        provinces,
        city,
        restaurant_id,
        hotel_id,
        is_show,
        time_line,
      } = req.body;

      await Tour.findOneAndUpdate(
        { _id: _id },
        {
          tour_name,
          description,
          price,
          thumbnail,
          provinces,
          city,
          restaurant_id,
          hotel_id,
          is_show,
        },
        { new: true }
      );

      console.log('id', id)
      const response = await TourSchedule.find({ tour_id: id });
      response.map(async (item) => {
        const deleteTourScheduleData = await TourSchedule.findByIdAndDelete({
          _id: item._id,
        });
        console.log("delete tour success", deleteTourScheduleData);
      });
      // await TourSchedule.find({idTour:tour_id}).remove();

      time_line.map(async (item) => {
        const newCreateSchedule = await TourSchedule({
          day: item.day,
          schedule: item.schedule,
          tour_id: tour_id,
        });
        await newCreateSchedule.save();
      });

      res.status(200).json("cap nhat thanh cong");
    } catch (error) {
      res.status(500).json("cap nhat that bai");
    }
  },

  deleteTour: async (req, res) => {
    try {
      const { id } = req.params;
      await Tour.findByIdAndDelete({ _id: id });
      res.status(200).json("xoa tour thanh cong");
    } catch (error) {
      res.status(500).json("xoa that bai");
    }
  },

  getTourSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const dataEmpty = [];
      const dataTour = await Tour.find();
      const dataTourSchedule = await TourSchedule.find();
      dataTour.map((item) => {
        const response = dataTourSchedule.map((itemSchedule) => {
          if (item.idTour === itemSchedule.tour_id) {
            return itemSchedule;
          } else {
            return;
          }
        });

        const filterData = response.filter((item) => item !== undefined);

        dataEmpty.push({
          item: item,
          time_line: filterData,
        });
      });

      const formatDataDetail = dataEmpty.map((itemView) => itemView);
      const responseFilterId = formatDataDetail.map((itemNoew) => {
        if (itemNoew.item.idTour === Number(id)) {
          return itemNoew;
        }
      });

      const filterNull = responseFilterId.filter(
        (itemFilter) => itemFilter !== undefined
      );
      res.status(200).json(filterNull);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteTourSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTourParam = await Tour.findOne({ idTour: id });
      const deleteTour = await Tour.findByIdAndDelete({
        _id: deleteTourParam._id,
      });
      const response = await TourSchedule.find({ tour_id: id });
      response.map(async (item) => {
        const deleteTourScheduleData = await TourSchedule.findByIdAndDelete({
          _id: item._id,
        });
        console.log("delete tour success", deleteTourScheduleData);
      });

      console.log("delete all success");
      res.status(200).json("delete all success");
    } catch (error) {
      console.log("error", error);
      res.status(500).json(error);
    }
  },

  getAllTour: async (req, res) => {
    try {
      const dataEmpty = [];
      const dataTour = await Tour.find();
      const dataTourSchedule = await TourSchedule.find();
      dataTour.map((item) => {
        const response = dataTourSchedule.map((itemSchedule) => {
          if (item.idTour === itemSchedule.tour_id) {
            return itemSchedule;
          } else {
            return;
          }
        });

        const filterData = response.filter((item) => item !== undefined);

        dataEmpty.push({
          item: item,
          time_line: filterData,
        });

        res.status(200).json(dataEmpty);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = tourController;
