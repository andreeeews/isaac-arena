class Utils {
    static drawDebugRect(ctx, x, y, h, w) {
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.strokeRect(x, y, w, h);
        ctx.restore(); 
    }
}