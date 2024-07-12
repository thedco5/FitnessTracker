const BASE_URL = "http://localhost:8080/api";

const getHeaders = (): Headers => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken)
    headers.append("Authorization", `Bearer ${accessToken}`);
  return headers;
};

const customFetch = (URL: string, method: string, body: {} | null) => {
  return fetch(BASE_URL + URL, {
    method: method,
    headers: getHeaders(),
    body: body ? JSON.stringify(body) : null
  });
}

export default customFetch;


const setError = (str: string) => {}


/* LOGIN */
try {
  const response = await customFetch(
    '/public/login', 
    'POST', 
    {
      "username": emailOrUsername,
      "password": password
    }
  )
  if (response.ok) {
    const data = await response.json();
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('accessToken', accessToken);
    await fetchUserInfo(accessToken); 
    setIsSignedIn(true);
    handleClose();
    console.log("Logged in.");
  } else {
    const messages = await response.json();
    let problem = "";
    for (let message of messages)
      problem += message;
    setError('Sign-in failed. Please check your credentials: ' + problem);
  }
} catch (error) {
  setError('Sign-in failed. Please try again later. ');
}


/* SIGNUP */
try {
  const response = await customFetch(
    '/public/signup',
    'POST',
    {
      'name': name,
      'username': username,
      'email': email,
      'password': password,
      'gender': gender?.toUpperCase() || null,
      'image': image != null ? { data: image } : null
    }
  )
  if (response.ok) {
    const data = await response.text();
    switchToSignIn();
    console.log(data);
    setError("");
  } else {
    const messages = await response.json();
    let problem = "";
    for (let message of messages)
      problem += message;
    setError('Sign-up failed. Please check your details: ' + problem);
  }
} catch (error) {
  setError('Sign-up failed. Please try again later.');
}


/* USER INFO */
try {
  const accessToken = token || localStorage.getItem('accessToken');
  if (!accessToken)
    throw new Error('No access token available');
  const response = await customFetch(
    '/user/info',
    'GET', null
  )
  if (response.ok) {
    const data = await response.json();
    console.log("User Info: ", data);
    setUserInfo({ username: data.username, email: data.email, image: data.image?.data || null });
  } else {
    setError('Failed to fetch user info. ');
  }
} catch (error) {
  setError('Failed to fetch user info. ' + error);
}


/* LOGOUT */
try {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken)
    throw new Error("No refresh token!");
  const response = await customFetch(
    '/user/logout',
    'DELETE',
    { "token": refreshToken }
  )
  if (response.ok) {
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('accessToken', '');
  } else {
    throw new Error("Request failed: status " + response.status);
  }
} catch (error) {
  setError('Failed to log out. ' + error);
}


/* REFRESH TOKEN(S) */
try {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken)
    throw new Error("No refresh token!");
  const response = await customFetch(
    '/public/refresh',
    'POST',
    { "token": refreshToken }
  )
  if (response.ok) {
    const data = await response.json();
    const newAccessToken = data.access_token;
    const newRefreshToken = data.refresh_token;
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  } else {
    throw new Error(`Request failed: [${response.status}] ${response.statusText}`);
  }
} catch (error) {
  setError('Failed to refresh tokens. ' + error);
}


/* UPDATE USER PROFILE PICTURE */
try {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken)
    throw new Error('No access token available!');
  const response = await customFetch(
    '/user',
    'PATCH',
    { "image": { data: INSERT_IMAGE_DATA } }
  )
  if (response.ok) {
    await fetchUserInfo(accessToken);
  } else {
    throw new Error(`Request failed: [${response.status}] ${response.statusText}`);
  }
} catch (error) {
  setError('Failed to update profile. ' + error);
}


/* GET EXERCISES */
try {
  const accessToken = localStorage.getItem('accessToken');
  const response = await customFetch(
    '/exercise' 
    + (accessToken ? "" : "/public")
    + (INSERT_PAGE_NUMBER == 0 ? "" : `?page=${INSERT_PAGE_NUMBER}`),
    'GET', null // filters can be put here
  )
  if (response.ok) {
    // Заявката връща масив от упражненията със следната информация:
    // [
    //   {
    //       "id": "8021eddb-d401-4332-a28b-e718b84e2092",
    //       "name": "name2",
    //       "description": "desc2",
    //       "timesFinished": 0,
    //       "likes": 0,
    //       "calories": 0,
    //       "duration": 5,
    //       "durationType": "SECONDS",
    //       "difficulty": "EASY",
    //       "type": "WHOLE_BODY",
    //       "visibility": "PRIVATE",
    //       "image": null,
    //       "author": {
    //           "id": null,
    //           "name": "myNewName",
    //           "username": "user",
    //           "email": "user@ema.il",
    //           "password": null,
    //           "exercisesFinished": 0,
    //           "gender": "FEMALE",
    //           "image": null
    //       }
    //   }, ...
    // ]
    // ID-тата трябва да се пазят заради други заявки
  } else {
    throw new Error(`Request failed: [${response.status}] ${response.statusText}`);
  }
} catch (error) {
  setError('Failed to get exercises. ' + error);
}


/* ADD EXERCISE */
try {
  const accessToken = localStorage.getItem('accessToken');
  const response = await customFetch(
    '/exercise',
    'POST',
    {
      // "name": "name",
      // "description": "desc",
      // "calories": 10,
      // "duration": 5,
      // "durationType": "SECONDS/PAIRS/REPETITIONS",
      // "difficulty": "VERY_EASY/EASY/NORMAL/HARD/EXPERT",
      // "type": "WHOLE_BODY/UPPER_BODY/LOWER_BODY",
      // "visibility": "PRIVATE/PUBLIC",
      // "image": { "data": "jecniOJH90VESCXZ..." },
    }
  )
  if (response.ok) {
    fetchExercises(); // да се актуализират
  } else {
    throw new Error(`Request failed: [${response.status}] ${response.statusText}: ${await response.text()}`);
  }
} catch (error) {
  setError('Failed to аdd exercise. ' + error);
}


/* GET WORKOUTS */
try {
  const accessToken = localStorage.getItem('accessToken');
  const response = await customFetch(
    '/workout' 
    + (accessToken ? "" : "/public")
    + (INSERT_PAGE_NUMBER == 0 ? "" : `?page=${INSERT_PAGE_NUMBER}`),
    'GET', null // filters can be put here
  )
  if (response.ok) {
    // Заявката връща масив от workout-ове със следната информация:
    // [
    //   {
    //       "id": "edcbaf59-ede1-43bf-a4d0-44a6706e4eb0",
    //       "name": "name",
    //       "description": "desc",
    //       "timesFinished": 0,
    //       "likes": 0,
    //       "calories": 0,
    //       "restDuration": 0, *
    //       "liked": false,
    //       "saved": false,
    //       "difficulty": null,
    //       "type": null,
    //       "gender": null,
    //       "visibility": "PRIVATE",
    //       "exercises": [...масив от упражнения...],
    //       "image": {...},
    //       "author": {...}
    //   }, ...
    // ]
    // ID-тата трябва да се пазят заради други заявки
  } else {
    throw new Error(`Request failed: [${response.status}] ${response.statusText}`);
  }
} catch (error) {
  setError('Failed to get workouts. ' + error);
}


/* GET WORKOUT BY ID */
try {
  const accessToken = localStorage.getItem('accessToken');
  const response = await customFetch(
    '/workout/'
    + INSERT_WORKOUT_ID
    + (accessToken ? "" : "/public"),
    'GET', null
  )
  if (response.ok) {
    // Заявката връща workout със следната информация:
    // {
    //     "id": "edcbaf59-ede1-43bf-a4d0-44a6706e4eb0",
    //     "name": "name",
    //     "description": "desc",
    //     "timesFinished": 0,
    //     "likes": 0,
    //     "calories": 0,
    //     "restDuration": 0, *
    //     "liked": false,
    //     "saved": false,
    //     "difficulty": null,
    //     "type": null,
    //     "gender": null,
    //     "visibility": "PRIVATE",
    //     "exercises": [...масив от упражнения...],
    //     "image": {...},
    //     "author": {...}
    // }
  } else {
    throw new Error(`Request failed: [${response.status}] ${response.statusText}`);
  }
} catch (error) {
  setError('Failed to get workout. ' + error);
}


/* ADD WORKOUT */
try {
  const accessToken = localStorage.getItem('accessToken');
  const response = await customFetch(
    '/workout',
    'POST',
    {
      // "name": "name",
      // "description": "desc",
      // "calories": 0,
      // "restDuration": 0, *
      // "difficulty": "VERY_EASY/EASY/NORMAL/HARD/EXPERT,
      // "type": "UPPER_BODY/LOWER_BODY/WHOLE_BODY",
      // "gender": null/"MALE/FEMALE/OTHER",
      // "visibility": "PRIVATE/PUBLIC",
      // "exercises": [...масив от упражнения чрез ID - { "id": "mdioejs-dvkxnv-savkxnvz" }...],
      // "image": {...}
    }
  )
  if (response.ok) {
    fetchExercises(); // да се актуализират
  } else {
    throw new Error(`Request failed: [${response.status}] ${response.statusText}: ${await response.text()}`);
  }
} catch (error) {
  setError('Failed to аdd workout. ' + error);
}


/* UPDATE WORKOUT OR ADD/REMOVE EXERCISE FROM IT BY ID */
try {
  const accessToken = localStorage.getItem('accessToken');
  const response = await customFetch(
    '/workout/'
    + INSERT_WORKOUT_ID,
    'PUT',
    {
      // "calories": 0,
      // "restDuration": 0, *
      // "exercises": [...масив от упражнения чрез ID - { "id": "mdioejs-dvkxnv-savkxnvz" }...],
    }
  )
  if (response.ok) {
    fetchExercises(); // да се актуализират
  } else {
    throw new Error(`Request failed: [${response.status}] ${response.statusText}: ${await response.text()}`);
  }
} catch (error) {
  setError('Failed to update workout. ' + error);
}