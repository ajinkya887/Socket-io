const PDFDocument = require("pdfkit");
const Message = require("../models/Message");

const downloadChats = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });

    const doc = new PDFDocument();
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=chat_history.pdf"
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Chat History", { align: "center" }).moveDown(1.5);

    messages.forEach((msg) => {
      const time = new Date(msg.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      doc
        .fontSize(12)
        .text(`[${time}] ${msg.user}: ${msg.text}`, {
          width: 500,
          align: "left",
        })
        .moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).send("Failed to generate chat history PDF.");
  }
};

module.exports = { downloadChats };
