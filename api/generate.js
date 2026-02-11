import PDFDocument from "pdfkit";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { sender, receiver, amount, bank, reference } = req.body;

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=payment-advice.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("PAYMENT ADVICE", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Sender: ${sender}`);
  doc.text(`Receiver: ${receiver}`);
  doc.text(`Bank: ${bank}`);
  doc.text(`Amount: ₦${amount}`);
  doc.text(`Reference: ${reference}`);
  doc.text(`Date: ${new Date().toLocaleString()}`);

   doc.end();
}
