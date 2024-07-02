package zetta.fitnesstrackerbackend.vo;

public enum Difficulty {

    VERY_EASY(0),
    EASY(1),
    MEDIUM(2),
    HARD(3),
    EXPERT(4);

    private final int level;

    Difficulty(int level) {
        this.level = level;
    }

    public int getNumericalLevel() {
        return this.level;
    }

}