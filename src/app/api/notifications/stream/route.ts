import { NextRequest, NextResponse } from 'next/server';

interface NotificationPayload {
  type: 'order' | 'inventory' | 'message';
  title: string;
  message: string;
  link: string;
}

function formatSSE(data: NotificationPayload) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      // Keep‑alive comment every 15 seconds
      const keepAlive = setInterval(() => {
        controller.enqueue(new TextEncoder().encode(': keep‑alive\n\n'));
      }, 15000);

      // Emit a mock notification every 7 seconds
      const interval = setInterval(() => {
        const mock: NotificationPayload[] = [
          {
            type: 'order',
            title: 'New Order',
            message: `Order ${Math.floor(Math.random() * 1000)} placed`,
            link: '/admin/orders',
          },
          {
            type: 'inventory',
            title: 'Low Stock',
            message: 'Product "Limited Edition" stock below threshold',
            link: '/admin/inventory',
          },
          {
            type: 'message',
            title: 'Customer Message',
            message: 'New message from a customer',
            link: '/admin/messages',
          },
        ];
        const payload = mock[Math.floor(Math.random() * mock.length)];
        controller.enqueue(new TextEncoder().encode(formatSSE(payload)));
      }, 7000);

      // Cleanup when client disconnects
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        clearInterval(keepAlive);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
