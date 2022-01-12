let remote = process.env.REACT_APP_VERCEL_URL;

if (remote) {
    console.log(`Testing against remote url: ${remote}.`);
} else {
    console.log('Testing locally only.');
}