// export const BASE_URL =
//   "https://second-brain-dcnd.vercel.app/?vercelToolbarCode=mwYNP7PN3YeashF";



export const BASE_URL = "https://second-brain-dcnd.vercel.app/?vercelToolbarCode=mwYNP7PN3YeashF"
export const endPoints={
    SIGN_UP:`${BASE_URL}/api/v1/signup`,
    SIGN_IN:`${BASE_URL}/api/v1/signin`,
    CONTENT:`${BASE_URL}/api/v1/content`,
    SHARE:`${BASE_URL}/api/v1/brain/share`,
    LINK:`${BASE_URL}/api/v1/brain/:shareLink`,
    STATUS:`${BASE_URL}/api/v1/status`,
    TAG:`${BASE_URL}/api/v1/tag`
}

// SIGN_UP: `${BASE_URL}/signup`,
// SIGN_IN: `${BASE_URL}/signin`,
// CONTENT: `${BASE_URL}/content`,
// SHARE: `${BASE_URL}/brain/share`,