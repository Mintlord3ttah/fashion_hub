export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;

  // Get headers from first object
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ];

  const csvContent = csvRows.join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export function formatOrdersForExport(orders: any[]) {
  return orders.map(o => ({
    'Order ID': o.id,
    'Customer': o.customer,
    'Email': o.email || '',
    'Product': o.product,
    'Status': o.status,
    'Amount': o.amount,
    'Date': o.date,
  }));
}

export function formatCustomersForExport(customers: any[]) {
  return customers.map(c => ({
    'Name': c.name,
    'Email': c.email,
    'Phone': c.phone || '',
    'Orders': c.orders || 0,
    'Total Spent': c.spent || '',
    'Joined': c.joined || '',
  }));
}

export function formatInventoryForExport(inventory: any[]) {
  return inventory.map(item => ({
    'ID': item.id,
    'Name': item.name,
    'SKU': item.sku,
    'Stock': item.stock,
    'Threshold': item.threshold,
    'Status': item.status,
  }));
}
