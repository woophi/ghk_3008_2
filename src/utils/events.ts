declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
export const sendDataToGA = async (choice: string) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbx5qS026IyZtWfcQIFKLLciT9548nQlzLmxbpqemWemC2grXEWrNp-_ucwsbDBZg6JYWQ/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, choice, variant: '3008_2' }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
