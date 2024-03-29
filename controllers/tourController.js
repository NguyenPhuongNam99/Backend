const Tour = require("../models/tour");
const TourSchedule = require("../models/tour_schedule");
const city = require("../models/City");
const review = require('../models/review');
const {flat} = require('lodash')
const _ = require('lodash')
const tourFavorite = require('../models/tourFavorite');

const router = require('express').Router();

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
        is_popular,
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
        is_popular
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
        is_popular
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
          is_popular
        },
        { new: true }
      );

      console.log("id", id);
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
      const dataTourValue = await Tour.find();
      const dataTourSchedule = await TourSchedule.find();
      const add2 = (x) => x + 2;
      const cityResponse = await city.find();

      Promise.resolve(dataTourValue)
        .then((dataTour) => {
          dataTour.map(async (item) => {
            const response = dataTourSchedule.map((itemSchedule) => {
              if (item.idTour === itemSchedule.tour_id) {
                return itemSchedule;
              } else {
                return;
              }
            });
            // item.filter((dataFilter) => String(dataFilter.is_popular) === 'true')
            console.log('item name0', String(item.is_show) === 'true')
            const filterData = response.filter((item) => item !== undefined);

            // const getCityName = await city.findOne({ cityId: item.city });

            // console.log('get city', getCityName?.name)

            const findNameCIty = cityResponse.filter(
              (itemCity) => Number(itemCity.cityId) === Number(item.city)
            );

            dataEmpty.push({
              item: item,
              time_line: filterData,
              nameCIty: findNameCIty[0].name,
              namelat: findNameCIty[0]?.lat,
              namelng: findNameCIty[0]?.lng,
            });


          });
          return dataEmpty;
        })
        .then((data) => {

          res.status(200).json(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTourId: async (req, res) => {
    try {
      const response = await Tour.find();
      console.log("response", response);
      res.status(200).json(response);
    } catch (error) {
      console.log("eror tour", error);
      res.status(500).json(error);
    }
  },

  getAllTourOfCity: async (req, res) => {
    try {
      const { id } = req.params;
      const dataEmpty = [];
      const dataTourValue = await Tour.find();
      const dataTourSchedule = await TourSchedule.find();
      const add2 = (x) => x + 2;
      const cityResponse = await city.find();

      Promise.resolve(dataTourValue)
        .then((dataTour) => {
          dataTour.map(async (item) => {
            const response = dataTourSchedule.map((itemSchedule) => {
              if (item.idTour === itemSchedule.tour_id) {
                return itemSchedule;
              } else {
                return;
              }
            });
            const filterData = response.filter((item) => item !== undefined);

            // const getCityName = await city.findOne({ cityId: item.city });

            // console.log('get city', getCityName?.name)

            const findNameCIty = cityResponse.filter(
              (itemCity) => Number(itemCity.cityId) === Number(item.city)
            );

            dataEmpty.push({
              item: item,
              time_line: filterData,
              nameCIty: findNameCIty[0].name,
              namelat: findNameCIty[0]?.lat,
              namelng: findNameCIty[0]?.lng,
            });
          });
          return dataEmpty;
        })
        .then((data) => {
          // console.log('data newwww', data)
          const dataCityResponse = data.filter(
            (item) => Number(item.item.city) === Number(id)
          );
          res.status(200).json(dataCityResponse);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTourOfId: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await Tour.findOne({ _id: id });
      console.log('responsse', response)
      res.status(200).json(response)
    } catch (error) {
      console.log('error', error);
      res.status(500).json(error)
    }
  },

  getTourPopular: async (req, res) => {
    try {
      const dataEmpty = [];
      const dataTourValue = await Tour.find();
      const dataTourSchedule = await TourSchedule.find();
      const tourReview = await review.find();
      const cityResponse = await city.find();

      // console.log('tour review find', tourReview)
      Promise.resolve(dataTourValue)
        .then((dataTour) => {
          dataTour.map(async (item) => {
            const response = dataTourSchedule.map((itemSchedule) => {
              if (item.idTour === itemSchedule.tour_id) {
                return itemSchedule;
              } else {
                return;
              }
            });
            const filterData = response.filter((item) => item !== undefined);

            // const getCityName = await city.findOne({ cityId: item.city });

            // console.log('get city', getCityName?.name)

            const findNameCIty = cityResponse.filter(
              (itemCity) => Number(itemCity.cityId) === Number(item.city)
            );

            dataEmpty.push({
              item: item,
              time_line: filterData,
              nameCIty: findNameCIty[0].name,
              namelat: findNameCIty[0]?.lat,
              namelng: findNameCIty[0]?.lng,
            });
          });
          return dataEmpty;
        })
        .then((data) => {
          const response = tourReview.map((itemReview) => {
            const dataDB = data.map((itemdb) => {
              if (itemReview.objectIdTour == itemdb.item._id && itemReview.rate_star == 'good' ) {
                return itemdb;
              }
            })
            return dataDB.filter((itemFilter) => itemFilter).filter((itemFitler2) => itemFitler2 !== null);
          })

          const tmp = response.filter((item) => item.length > 0);
          const tmpArray = tmp.flat(1)
          const uniqBy = _.uniqBy(tmpArray, "item._id")
         
          res.status(200).json(uniqBy);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTourForOptionPerson: async (req, res) => {
    try {
      const {price, place} = req.body;
      const dataEmpty = [];
      const dataTourValue = await Tour.find();
      const dataTourSchedule = await TourSchedule.find();
      const add2 = (x) => x + 2;
      const cityResponse = await city.find();

      Promise.resolve(dataTourValue)
        .then((dataTour) => {
          dataTour.map(async (item) => {
            const response = dataTourSchedule.map((itemSchedule) => {
              if (item.idTour === itemSchedule.tour_id) {
                return itemSchedule;
              } else {
                return;
              }
            });
            // item.filter((dataFilter) => String(dataFilter.is_popular) === 'true')
            const filterData = response.filter((item) => item !== undefined);

            // const getCityName = await city.findOne({ cityId: item.city });

            // console.log('get city', getCityName?.name)

            const findNameCIty = cityResponse.filter(
              (itemCity) => Number(itemCity.cityId) === Number(item.city)
            );

            dataEmpty.push({
              item: item,
              time_line: filterData,
              nameCIty: findNameCIty[0].name,
              namelat: findNameCIty[0]?.lat,
              namelng: findNameCIty[0]?.lng,
            });


          });
          return dataEmpty;
        })
        .then((data) => {
          console.log('price', place, price)
          const resposeData = data.filter((itemData) => {
            if(itemData.item.city === place &&   itemData.item.price< price) {
              return itemData;
            }
          })

          console.log('response data', resposeData)
          res.status(200).json(resposeData);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTourFavouriteOfAllTour : async (req, res) => {
    try {
      const dataEmpty = [];
      const dataTourValue = await Tour.find();
      const dataTourSchedule = await TourSchedule.find();
      const add2 = (x) => x + 2;
      const cityResponse = await city.find();
      const {id} = req.params;
      const userData = await tourFavorite.find({user_id: id});

      Promise.resolve(dataTourValue)
        .then((dataTour) => {
          dataTour.map(async (item) => {
            const response = dataTourSchedule.map((itemSchedule) => {
              if (item.idTour === itemSchedule.tour_id) {
                return itemSchedule;
              } else {
                return;
              }
            });
            // item.filter((dataFilter) => String(dataFilter.is_popular) === 'true')
            const filterData = response.filter((item) => item !== undefined);

            // const getCityName = await city.findOne({ cityId: item.city });

            // console.log('get city', getCityName?.name)

            const findNameCIty = cityResponse.filter(
              (itemCity) => Number(itemCity.cityId) === Number(item.city)
            );

            dataEmpty.push({
              item: item,
              time_line: filterData,
              nameCIty: findNameCIty[0].name,
              namelat: findNameCIty[0]?.lat,
              namelng: findNameCIty[0]?.lng,
            });


          });
          return dataEmpty;
        })
        .then((data) => {

          const response = userData.map((itemUser) => {
            const dataTourAll = data.map((itemDataDb) => {
              if(itemDataDb.item.idTour == itemUser._idTour){
                return itemDataDb;
              }
            })
            return dataTourAll
          })

          const flatData = response.flat(1)
          res.status(200).json(_.uniqBy(flatData.filter((itemNull) => itemNull), "item._id"));
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = tourController;
