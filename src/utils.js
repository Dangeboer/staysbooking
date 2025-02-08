// 前后端通信的所有设置
const domain = "https://staybooking-978617402810.us-west1.run.app";

// 这是用来login的
export const login = (credential) => {
  const loginUrl = `${domain}/auth/login`; // `...`: string template: string里插入了js表达式

  // 指挥浏览器和后端通信
  // fetch返回的是一个状态
  const requestStatus = fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  });

  // 拿到后应该做什么，括号里的response是函数变量
  return requestStatus.then((response) => {
    // 如果大于response大于300
    if (response.status >= 300) {
      throw Error("Fail to log in");
    }
    return response.json();
  });
};

// 用于注册，这里的fetch放在一起写了
export const register = (credential) => {
  const registerUrl = `${domain}/auth/register`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to register");
    }
  });
};

// 每个函数都对应着后端的api
export const getReservations = () => {
  // 要先拿到通行证
  const authToken = localStorage.getItem("authToken");
  const listReservationsUrl = `${domain}/bookings`;

  return fetch(listReservationsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get reservation list");
    }

    return response.json();
  });
};

// 房东的房子
export const getStaysByHost = () => {
  const authToken = localStorage.getItem("authToken");
  const listStaysUrl = `${domain}/listings`;

  return fetch(listStaysUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get stay list");
    }

    return response.json();
  });
};

// 客人搜索
// query string
export const searchStays = (query) => {
  const authToken = localStorage.getItem("authToken");
  const searchStaysUrl = new URL(`${domain}/listings/search`);
  searchStaysUrl.searchParams.append("guest_number", query.guest_number);
  searchStaysUrl.searchParams.append(
    "checkin_date",
    query.checkin_date.format("YYYY-MM-DD")
  );
  searchStaysUrl.searchParams.append(
    "checkout_date",
    query.checkout_date.format("YYYY-MM-DD")
  );
  // 这个经纬度固定了，没有和Google Map进行集成
  searchStaysUrl.searchParams.append("lat", 37);
  searchStaysUrl.searchParams.append("lon", -122);
  searchStaysUrl.searchParams.append("distance", 500000);

  return fetch(searchStaysUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to search stays");
    }

    return response.json();
  });
};

// 删除
export const deleteStay = (stayId) => {
  const authToken = localStorage.getItem("authToken");
  const deleteStayUrl = `${domain}/listings/${stayId}`;

  return fetch(deleteStayUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to delete stay");
    }
  });
};

export const bookStay = (data) => {
  const authToken = localStorage.getItem("authToken");
  const bookStayUrl = `${domain}/bookings`;

  return fetch(bookStayUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to book reservation");
    }
  });
};

export const cancelReservation = (reservationId) => {
  const authToken = localStorage.getItem("authToken");
  const cancelReservationUrl = `${domain}/bookings/${reservationId}`;

  return fetch(cancelReservationUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to cancel reservation");
    }
  });
};

export const getReservationsByStay = (stayId) => {
  const authToken = localStorage.getItem("authToken");
  const getReservationByStayUrl = `${domain}/listings/${stayId}/bookings`;

  return fetch(getReservationByStayUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to get reservations by stay");
    }

    return response.json();
  });
};

export const uploadStay = (data) => {
  const authToken = localStorage.getItem("authToken");
  const uploadStayUrl = `${domain}/listings`;

  return fetch(uploadStayUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Fail to upload stay");
    }
  });
};
