DROP TRIGGER IF EXISTS after_insert_master_inventory;

CREATE TRIGGER after_insert_master_inventory
AFTER
INSERT ON master_inventory FOR EACH ROW 

BEGIN
    IF @disable_triggers IS NULL
    OR @disable_triggers = 0 
THEN

INSERT INTO inventory_quantity (
        iq_inventory_id,
        iq_quantity,
        iq_running_balance,
        iq_created_at,
        iq_status
    )
VALUES (
        NEW.mi_id,
        0.00000,
        0.00000,
        NOW(),
        NEW.mi_status
    );
    
END IF;

END