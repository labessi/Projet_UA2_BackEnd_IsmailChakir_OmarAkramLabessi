import reservation from "../models/reservation.js";

// Créer une réservation
export const createReservation = async (req, res) => {
    try {
      // Convertir no_tables_reserver en JSON si c'est un tableau
      const reservationData = {
        ...req.body,
        no_tables_reserver: JSON.stringify(req.body.no_tables_reserver),
      };
  
      const newReservation = await reservation.create(reservationData);
      res.status(201).json(newReservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Obtenir toutes les réservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les réservations par client
export const getReservationsByClient = async (req, res) => {
    try {
      const clientName = req.query.nom_client;
  
      if (!clientName) {
        return res.status(400).json({ message: "Le nom du client est requis." });
      }
  
      const reservations = await reservation.findAll({
        where: { nom_client: clientName },
      });
  
      // Convertir no_tables_reserver en tableau pour le frontend
      const formattedReservations = reservations.map((r) => ({
        ...r.toJSON(),
        no_tables_reserver: JSON.parse(r.no_tables_reserver),
      }));
  
      res.status(200).json(formattedReservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Mettre à jour une réservation
export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await reservation.update(req.body, { where: { id } });
    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une réservation
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await reservation.destroy({ where: { id } });
    res.status(200).json({ message: "Réservation supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir une réservation spécifique par ID
export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservationItem = await reservation.findOne({ where: { id } });

    if (!reservationItem) {
      return res.status(404).json({ message: "Réservation non trouvée." });
    }

    res.status(200).json(reservationItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
