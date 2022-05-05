import {
  con,
  domains,
  courses,
  resources,
  notifications,
  paymentRequests,
} from "../Mock/index.js";
import _ from "../../cradova/index.js";
import { menu, Batch, Gam, Input } from "./index.js";
// #e2c9b3
// #f3f8fc
// #A0A3BD
// #faad14
// #9d9d9d
// #14dde7 light blue
// #1032d9 dark blue
// #36e517 green
// #eff9fb light mode
// #333333 dark mode
// #141618 dark mode
export default function FormContainer(view) {
  switch (view) {
    case "Courses":
      return CourseModal();
    case "Resources":
      return ResourseModal();
    case "Domains":
      return DomainModal();
    case "Notifications":
      return NotificationModal();
    default:
      return "nothing here in  " + view + "  work space please don't refresh";
  }
}

export const Loader = () => {
  return _(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#efeeea",
      },
    },
    _("img", {
      src: "../../../assets/loading.gif",
      style: {
        width: "22px",
      },
    }),
    _`p| Updating Backend...`
  );
};

export const ErrorBox = (text, screens) => {
  return _(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#efeeea",
      },
    },
    _`p| Transaction Failed!`,

    _("p", {
      text: text,
      style: {
        padding: "15px",
        border: "2px yellow solid",
        borderRadius: "12px",
        width: "90%",
        height: "40%",
        margin: "0px auto",
      },
    }),
    _("button.btn", {
      text: "   Get Back   ",
      style: {
        padding: "8px 18px",
        border: "2px white solid",
        borderRadius: "12px",
        margin: "20px auto",
      },
      onclick() {
        if (typeof screens !== "string") {
          _.dispatch("home-statistics-components", { tree: screens });
          return;
        }
        _.dispatch("workspace", { tree: FormContainer(screens) });
      },
    })
  );
};

export const SuccessBox = (text, screens) => {
  return _(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
    },
    _`p| Transaction Successful!`,

    _("p", {
      text: text,
      style: {
        padding: "15px",
        border: "2px yellow solid",
        borderRadius: "12px",
        width: "90%",
        height: "40%",
        margin: "0px auto",
      },
    }),
    _("button.btn", {
      text: "   Get Back   ",
      style: {
        padding: "8px 18px",
        border: "2px white solid",
        borderRadius: "12px",
        margin: "20px auto",
      },
      onclick() {
        if (typeof screens !== "string") {
          _.dispatch("home-statistics-components", { tree: screens });
          return;
        }
        _.dispatch("workspace", { tree: FormContainer(screens) });
      },
    })
  );
};

export function DomainModal() {
  // FIXME: here i will get admin credentials and pass it downwards
  const credentials = _.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    title: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: true,
  });

  return _(
    "div",
    {
      style: {
        display: "flex",
        // border: "2px red solid",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "80%",
        margin: "0px auto",
        flexDirection: "column",
      },
    },
    _("h3| All Domains"),
    _(
      "div",
      _("h4.work-space-title| Create Domains"),
      Input({
        placeholder: "Domain title",
        field: "title",
        credentials,
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          const domain = await _.fetcher(
            "https://unihub.trgwii.com/admin/create/domain",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            credentials.get()
          );
          let res = await domain.text();
          if (typeof res !== "object") {
            res = JSON.parse(await domain.text());
          }
          if (!domain.ok) {
            _.dispatch("workspace", { tree: ErrorBox(res.message, "Domains") });
          } else {
            _.dispatch("workspace", {
              tree: SuccessBox(res.message, "Domains"),
            });
          }
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Delete Domain"),
      Input({
        placeholder: "Domain title",
        field: "title",
        credentials,
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          const domain = await _.fetcher(
            "https://unihub.trgwii.com/admin/delete/domain",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            credentials.get()
          );
          let res = await domain.text();
          if (typeof res !== "object") {
            res = JSON.parse(await domain.text());
          }
          if (!domain.ok) {
            _.dispatch("workspace", { tree: ErrorBox(res.message, "Domains") });
          } else {
            _.dispatch("workspace", {
              tree: SuccessBox(res.message, "Domains"),
            });
          }
        },
      })
    )
  );
}

export function CourseModal() {
  // FIXME: here i will get admin credentials and pass it downwards
  const credentials = _.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    title: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: true,
    file: "",
    welcome: "",
    domain: "",
  });

  return _(
    "div",
    {
      style: {
        display: "flex",
        // border: "2px red solid",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "90%",
        margin: "0px auto 80px auto",
        flexDirection: "column",
      },
    },
    _("h3| Courses"),
    _(
      "div",
      _("h4.work-space-title| Create Course"),
      Input({
        placeholder: "Course title",
        field: "title",
        credentials,
      }),
      Input({
        placeholder: "Domain title",
        field: "domain",
        credentials,
      }),
      Input({
        placeholder: "Welcome message",
        field: "welcome",
        credentials,
      }),
      _("p| upload Course thumbnail"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            "https://unihub.trgwii.com/admin/create/Course",
            credentials.get(),
            (res) => {
              const Course = JSON.parse(res.response);
              if (Course.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(Course.message, "Courses"),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Course.message, "Courses"),
                });
              }
            }
          );
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Update Course"),
      Input({
        placeholder: "Course title",
        field: "title",
        credentials,
      }),
      Input({
        placeholder: "Domain title",
        field: "domain",
        credentials,
      }),
      Input({
        placeholder: "Welcome message",
        field: "welcome",
        credentials,
      }),
      _("p| upload Course thumbnail"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            "https://unihub.trgwii.com/admin/update/Course",
            credentials.get(),
            (res) => {
              const Course = JSON.parse(res.response);
              if (Course.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(Course.message, "Courses"),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Course.message, "Courses"),
                });
              }
            }
          );
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Delete Course"),
      Input({
        placeholder: "Course title",
        field: "title",
        credentials,
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          const Course = await _.fetcher(
            "https://unihub.trgwii.com/admin/delete/Course",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            credentials.get()
          );
          let res = await Course.text();
          if (typeof res !== "object") {
            res = JSON.parse(await Course.text());
          }
          if (!Course.ok) {
            _.dispatch("workspace", {
              tree: ErrorBox(res.message, "Courses"),
            });
          } else {
            _.dispatch("workspace", {
              tree: SuccessBox(res.message, "Courses"),
            });
          }
        },
      })
    )
  );
}

export function ResourseModal() {
  // FIXME: here i will get admin credentials and pass it downwards
  const credentials = _.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    courseTitle: "",
    resourceTitle: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: true,
    file: "",
    welcome: "",
    domain: "",
  });

  return _(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "90%",
        margin: "0px auto 60px auto",
        flexDirection: "column",
      },
    },
    _("h3| Resources"),
    _(
      "div",
      _("h4.work-space-title| Create Resource"),
      Input({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials,
      }),
      _("p| only pdf, json, video and audio"), // course title
      Input({
        placeholder: "Resource type",
        field: "type",
        credentials,
      }),
      Input({
        placeholder: "Course title",
        field: "courseTitle",
        credentials,
      }),
      Input({
        placeholder: "Resource link",
        field: "link",
        credentials,
      }),
      _("p| upload Resource file"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            "https://unihub.trgwii.com/admin/create/resource",
            credentials.get(),
            (res) => {
              const Resource = JSON.parse(res.response);
              if (Resource.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(Resource.message, "Resources"),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Resource.message, "Resources"),
                });
              }
            }
          );
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Create Resource"),
      Input({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials,
      }),
      _("p| only pdf, json, video and audio"), // course title
      Input({
        placeholder: "Resource type",
        field: "type",
        credentials,
      }),
      Input({
        placeholder: "Course title",
        field: "courseTitle",
        credentials,
      }),
      Input({
        placeholder: "Resource link",
        field: "link",
        credentials,
      }),
      _("p| upload Resource file"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            "https://unihub.trgwii.com/admin/up/resource",
            credentials.get(),
            (res) => {
              const Resource = JSON.parse(res.response);
              if (Resource.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(Resource.message, "Resources"),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Resource.message, "Resources"),
                });
              }
            }
          );
        },
      })
    ),
    _(
      "div",
      _("h4.work-space-title| Delete Resource"),

      Input({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials,
      }),
      Input({
        placeholder: "Course title",
        field: "courseTitle",
        credentials,
      }),
      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          const Resource = await _.fetcher(
            "https://unihub.trgwii.com/admin/delete/Resource",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            credentials.get()
          );
          let res = await Resource.text();
          if (typeof res !== "object") {
            res = JSON.parse(await Resource.text());
          }
          if (typeof res !== "object") {
            res = JSON.parse(await Resource.text());
          }
          if (!Resource.ok) {
            _.dispatch("workspace", {
              tree: ErrorBox(res.message, "Resources"),
            });
          } else {
            _.dispatch("workspace", {
              tree: SuccessBox(res.message, "Resources"),
            });
          }
        },
      })
    )
  );
}

export function NotificationModal() {
  // FIXME: here i will get admin credentials and pass it downwards
  const credentials = _.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    title: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: true,
    file: "",
    welcome: "",
    domain: "",
    content: "",
    link: "",
    inApp: false,
    file: "",
  });

  return _(
    "div",
    {
      style: {
        display: "flex",
        // border: "2px red solid",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "80%",
        margin: "0px auto",
        flexDirection: "column",
      },
    },
    _("h3| Create Notification"),
    _(
      "div",
      Input({
        placeholder: "Notification title",
        field: "title",
        credentials,
      }),
      Input({
        placeholder: "Content",
        field: "content",
        credentials,
      }),
      Input({
        placeholder: "Link",
        field: "link",
        credentials,
      }),
      Input({
        placeholder: "in app?",
        field: "inApp",
        credentials,
      }),
      _("p| upload Notification thumbnail"),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),

      _("button.btn", {
        text: "Make Request",
        onclick: async () => {
          _.dispatch("workspace", { tree: Loader() });
          await _.littleAxios(
            "https://unihub.trgwii.com/admin/create/notification",
            credentials.get(),
            (res) => {
              const Notification = JSON.parse(res.response);
              if (Notification.message !== "ok") {
                _.dispatch("workspace", {
                  tree: ErrorBox(Notification.message, "Notifications"),
                });
              } else {
                _.dispatch("workspace", {
                  tree: SuccessBox(Notification.message, "Notifications"),
                });
              }
            }
          );
        },
      })
    )
  );
}

/**
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx





xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx





xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx





xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */

// const PaymentModal = () => {
//   const goods = con(data);
//   return (
//     <TouchableWithoutFeedback>
//       <FlatList
//         keyExtractor={(i, index) => "_stats" + index}
//         showsVerticalScrollIndicator={false}
//         vertical
//         data={goods}
//         contentContainerStyle={{
//           // display: "none",
//           borderRadius: 20,
//           backgroundColor: "#4dccc6",
//           padding: 10,
//           width: "97.8%",
//         }}
//         renderItem={({ item, index }) => (
//           <View
//             style={{
//               marginBottom: 10,
//               width: "100%",
//               padding: 14,
//               borderRadius: 10,
//               backgroundColor: "whitesmoke",
//               alignItems: "flex-start",
//               justifyContent: "center",
//               shadowColor: "black",
//               shadowOffset: {
//                 width: 1,
//                 height: 1,
//               },
//               shadowRadius: 5,
//               shadowOpacity: 0.5,
//               elevation: 5,
//               borderRadius: 8,
//               paddingHorizontal: 8,
//             }}
//           >
//             <Texti size={14} color="grey">
//               {item[0]}
//             </Texti>
//             {item[1].map((cont, index) => (
//               <Batch key={uuidSuper(29) + index}>{cont}</Batch>
//             ))}

//             <View
//               style={{
//                 flexDirection: "row",
//                 margin: "auto",
//               }}
//             >
//               <TouchableOpacity
//                 style={[styles.btn, { marginHorizontal: 14 }]}
//                 onPress={async () => {
//                   setLoading(true);
//                   save.id = index;
//                   saver(save);
//                   const notification = await fetcher(
//                     "https://unihub.trgwii.com/admin/pay",
//                     "POST",
//                     {},
//                     save
//                   );
//                   if (notification.error) {
//                     setLoading(false);
//                     setError(true);
//                   } else {
//                     setLoading(false);
//                     setSuccess(true);
//                   }
//                   if (!notification.data) {
//                     setRes("you are offline");
//                   } else {
//                     setRes(notification.data.message);
//                   }
//                 }}
//               >
//                 <Texti color="lightgreen">Accept</Texti>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.btn, { marginHorizontal: 14 }]}
//                 onPress={async () => {
//                   setLoading(true);
//                   const notification = await fetcher(
//                     "https://unihub.trgwii.com/admin/decline",
//                     "POST",
//                     {},
//                     save
//                   );
//                   if (notification.error) {
//                     setLoading(false);
//                     setError(true);
//                   } else {
//                     setLoading(false);
//                     setSuccess(true);
//                   }
//                   if (!notification.data) {
//                     setRes("you are offline");
//                   } else {
//                     setRes(notification.data.message);
//                   }
//                 }}
//               >
//                 <Texti color="red">Decline</Texti>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </TouchableWithoutFeedback>
//   );
// };

_.css(".work-space-title", {
  color: "grey",
  margin: "9px",
});
