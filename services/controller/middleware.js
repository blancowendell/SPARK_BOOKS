var roleacess = [
  {
    role: "OJT",
    routes: [
      {
        layout: "ojtindexlayout",
      },
      {
        layout: "ojtattendancelayout",
      },
      {
        layout: "ojtreqabsentlayout",
      },
      {
        layout: "ojtprofilelayout",
      },
    ],
  },
];

exports.ValidatorforOjt = function (req, res, layout) {
  // console.log(layout);

  let ismatch = false;
  let counter = 0;
  // //console.log(roleacess.length)
  if (req.session.accesstype == "OJT" && layout == "ojtindexlayout") {
    console.log("hit");
    return res.render(`${layout}`, {
      image: req.session.image,
      ojtid: req.session.ojtid,
      fullname: req.session.fullname,
      accesstype: req.session.accesstype,
      departmentid: req.session.departmentid,
    });
  } else {
    roleacess.forEach((key, item) => {
      counter += 1;
      var routes = key.routes;

      routes.forEach((value, index) => {
        // console.log(`${key.role} - ${value.layout}`);

        if (key.role == req.session.accesstype && value.layout == layout) {
          console.log("Role: ", req.session.accesstype, "Layout: ", layout);
          ismatch = true;

          return res.render(`${layout}`, {
            image: req.session.image,
            ojtid: req.session.ojtid,
            fullname: req.session.fullname,
            accesstype: req.session.accesstype,
            department: req.session.department,
            status: req.session.status,
            geofenceid: req.session.geofenceid,
          });
        }
      });

      if (counter == roleacess.length) {
        if (!ismatch) {
          res.redirect("/ojtlogin");
        }
      }
    });
  }
};

const { SelectStatement } = require("../../services/repository/cryptography");
const { Select } = require("../../services/repository/dbconnect");
const {
  JsonErrorResponse,
  JsonDataResponse,
} = require("../../services/repository/response");

exports.Validator = function (req, res, layout, route) {
  let sql = SelectStatement(
    "select * from master_access_route_layout where marl_accessid=? and marl_layout=? and marl_route=?",
    [req.session.accesstypeid, layout, route]
  );

  Select(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.json(JsonErrorResponse(err));
    }

    if (result != 0) {
      return res.render(`${layout}`, {
        accessid: req.session.accessid,
        accesstypeid: req.session.accesstypeid,
        positionid: req.session.positionid,
        image: req.session.image,
        employeeid: req.session.employeeid,
        fullname: req.session.fullname,
        accesstype: req.session.accesstype,
        geofenceid: req.session.geofenceid,
        departmentid: req.session.departmentid,
        subgroupid: req.session.subgroupid,
        departmentname: req.session.departmentname,
      });
    } else {
      res.redirect("/");
      // res.redirect("/login");
    }
  });
};

exports.EnsureLogin = function (req, res, next) {
  if (!req.session.accessid) {
    res.redirect("/login");
  } else {
    next();
  }
};

// exports.SidebarRestrictions = function (req, res, route, callback) {
//   let sql = SelectStatement(
//     "select marl_route from master_access_route_layout where marl_accessid = ?",
//     [req.session.accesstypeid]
//   );

//   console.log(sql);

//   Select(sql, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.json(JsonErrorResponse(err));
//     }

//

//     if (result.length > 0) {
//       return callback(null, result);
//     } else {
//       return res.render(`${route}`, {
//         accessid: req.session.accessid,
//         accesstypeid: req.session.accesstypeid,
//       });
//     }
//   });
// };

exports.SidebarRestrictions = function (req, res) {
  let sql = SelectStatement(
    "select marl_route from master_access_route_layout where marl_accessid = ?",
    [req.session.accesstypeid]
  );

  Select(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.json(JsonErrorResponse(err));
    }

    if (result.length > 0) {
      const allowedRoutes = result.map((row) => row.marl_route); // Extracting routes from result
      return res.json(JsonDataResponse({ allowedRoutes }));
    } else {
      return res.render("your_error_template", {
        // Adjust to your error handling
        accessid: req.session.accessid,
        accesstypeid: req.session.accesstypeid,
      });
    }
  });
};
