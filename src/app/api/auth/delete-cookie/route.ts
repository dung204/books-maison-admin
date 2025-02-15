export async function DELETE(_: Request) {
  return new Response(null, {
    status: 204,
    // @ts-expect-error Set-Cookie actually allows array
    headers: {
      'Set-Cookie': [
        `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        `refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      ],
    },
  });
}
