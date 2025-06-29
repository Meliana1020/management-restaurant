const { Feedback } = require('../models');

exports.submitFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengirim kritik/saran', error: err.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({ order: [['createdAt', 'DESC']] });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil kritik/saran', error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Data tidak ditemukan' });
    await feedback.destroy();
    res.json({ message: 'Kritik/saran berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus kritik/saran', error: err.message });
  }
};